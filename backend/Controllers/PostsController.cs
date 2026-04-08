using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalCarBE.Api.Data;
using RentalCarBE.Api.Models.DTOs.Posts;
using RentalCarBE.Api.Models.Entities;
using System.Security.Claims;

namespace RentalCarBE.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _db;
    public PostsController(AppDbContext db) => _db = db;

    private Guid GetUserId()
    {
        var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(idStr))
            throw new UnauthorizedAccessException("Missing user id claim.");
        return Guid.Parse(idStr);
    }

    // GET /api/posts?skip=0&take=10
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostListItemDto>>> GetPosts([FromQuery] int skip = 0, [FromQuery] int take = 10)
    {
        take = Math.Clamp(take, 1, 50);
        var userId = GetUserId();
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var posts = await _db.Posts
            .AsNoTracking()
            .Include(p => p.Author)
            .OrderByDescending(p => p.CreatedAt)
            .Skip(skip)
            .Take(take)
            .Select(p => new
            {
                p.Id,
                UserName = p.Author.FullName,
                UserAvatar = "https://i.pravatar.cc/100?u=" + p.AuthorId,
                p.CreatedAt,
                p.Content,
                p.ImageUrl,
                LikedCount = _db.PostLikes.Count(l => l.PostId == p.Id),
                CommentCount = _db.PostComments.Count(c => c.PostId == p.Id),
                IsLiked = _db.PostLikes.Any(l => l.PostId == p.Id && l.UserId == userId)
            })
            .ToListAsync();

        var result = posts.Select(p => new PostListItemDto(
            p.Id,
            p.UserName,
            p.UserAvatar,
            p.CreatedAt,
            p.Content,
            string.IsNullOrWhiteSpace(p.ImageUrl) ? null : $"{baseUrl}{p.ImageUrl}",
            p.LikedCount,
            p.CommentCount,
            p.IsLiked
        ));

        return Ok(result);
    }

    // POST /api/posts
    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
    {
        if ((dto.Content == null || string.IsNullOrWhiteSpace(dto.Content)) &&
            (dto.ImageUrl == null || string.IsNullOrWhiteSpace(dto.ImageUrl)))
        {
            return BadRequest(new { message = "Bài viết không được trống." });
        }

        var userId = GetUserId();

        var post = new Post
        {
            Id = Guid.NewGuid(),
            AuthorId = userId,
            Content = dto.Content?.Trim() ?? "",
            ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl) ? null : dto.ImageUrl.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _db.Posts.Add(post);
        await _db.SaveChangesAsync();

        return Ok(new { post.Id });
    }

    // DELETE /api/posts/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeletePost(Guid id)
    {
        var userId = GetUserId();

        var post = await _db.Posts.FirstOrDefaultAsync(p => p.Id == id);
        if (post == null) return NotFound(new { message = "Post không tồn tại." });

        if (post.AuthorId != userId)
            return StatusCode(StatusCodes.Status403Forbidden, new { message = "Bạn không có quyền xoá bài viết này." });

        var likes = await _db.PostLikes.Where(x => x.PostId == id).ToListAsync();
        var comments = await _db.PostComments.Where(x => x.PostId == id).ToListAsync();

        _db.PostLikes.RemoveRange(likes);
        _db.PostComments.RemoveRange(comments);
        _db.Posts.Remove(post);

        await _db.SaveChangesAsync();
        return Ok(new { message = "Đã xoá bài viết." });
    }

    // POST /api/posts/{id}/like
    [HttpPost("{id:guid}/like")]
    public async Task<IActionResult> ToggleLike(Guid id)
    {
        var userId = GetUserId();

        var postExists = await _db.Posts.AnyAsync(p => p.Id == id);
        if (!postExists) return NotFound(new { message = "Post không tồn tại." });

        var like = await _db.PostLikes
            .FirstOrDefaultAsync(x => x.PostId == id && x.UserId == userId);

        if (like != null)
        {
            _db.PostLikes.Remove(like);
            await _db.SaveChangesAsync();
            return Ok(new { liked = false });
        }

        _db.PostLikes.Add(new PostLike
        {
            Id = Guid.NewGuid(),
            PostId = id,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();
        return Ok(new { liked = true });
    }

    // GET /api/posts/{id}/comments
    [HttpGet("{id:guid}/comments")]
    public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments(Guid id)
    {
        var postExists = await _db.Posts.AnyAsync(p => p.Id == id);
        if (!postExists) return NotFound(new { message = "Post không tồn tại." });

        var comments = await _db.PostComments
            .AsNoTracking()
            .Include(c => c.User)
            .Where(c => c.PostId == id)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CommentDto(
                c.Id,
                c.Content,
                c.CreatedAt,
                c.User.FullName,
                "https://i.pravatar.cc/100?u=" + c.UserId
            ))
            .ToListAsync();

        return Ok(comments);
    }

    // POST /api/posts/{id}/comments
    [HttpPost("{id:guid}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] CreateCommentDto dto)
    {
        if (dto.Content == null || string.IsNullOrWhiteSpace(dto.Content))
            return BadRequest(new { message = "Nội dung bình luận không được trống." });

        var postExists = await _db.Posts.AnyAsync(p => p.Id == id);
        if (!postExists) return NotFound(new { message = "Post không tồn tại." });

        var userId = GetUserId();

        var comment = new PostComment
        {
            Id = Guid.NewGuid(),
            PostId = id,
            UserId = userId,
            Content = dto.Content.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _db.PostComments.Add(comment);
        await _db.SaveChangesAsync();

        return Ok(new { comment.Id });
    }

    // DELETE /api/posts/comments/{commentId}
    [HttpDelete("comments/{commentId:guid}")]
    public async Task<IActionResult> DeleteComment(Guid commentId)
    {
        var userId = GetUserId();

        var comment = await _db.PostComments.FirstOrDefaultAsync(c => c.Id == commentId);
        if (comment == null) return NotFound(new { message = "Bình luận không tồn tại." });

        if (comment.UserId != userId)
            return StatusCode(StatusCodes.Status403Forbidden, new { message = "Bạn không có quyền xoá bình luận này." });

        _db.PostComments.Remove(comment);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã xoá bình luận." });
    }
}