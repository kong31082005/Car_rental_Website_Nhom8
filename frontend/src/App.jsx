import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomeCustomer from "./pages/HomeCustomer.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Dashboard from "./pages/AdminScreens/DashBoardScreen.jsx";
import CarsManager from "./pages/AdminScreens/CarsManager.jsx";
import AddCar from "./pages/AdminScreens/AddCars.jsx";
import UsersManager from "./pages/AdminScreens/UsersManager.jsx";
import BookingManagement from "./pages/AdminScreens/BookingManager.jsx";
import ContractManager from "./pages/AdminScreens/ContractManager.jsx";
import VoucherManager from "./pages/AdminScreens/VoucherManager.jsx";
import NewsManagement from "./pages/AdminScreens/NewsManager.jsx";
import AdminSettings from "./pages/AdminScreens/Setting.jsx";
import SearchResults from "./pages/SearchResults.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomeCustomer />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<CarsManager />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="users" element={<UsersManager />} />
          <Route path="orders" element={<BookingManagement />} />
          <Route path="contracts" element={<ContractManager />} />
          <Route path="vouchers" element={<VoucherManager />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
