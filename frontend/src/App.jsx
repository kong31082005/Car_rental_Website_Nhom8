import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomeCustomer from "./pages/HomeCustomer.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Dashboard from "./pages/AdminScreens/DashBoardScreen.jsx";
import CarsManager from "./pages/AdminScreens/CarsManager.jsx";
import AddCar from "./pages/AdminScreens/AddCars.jsx";
import UsersManager from "./pages/AdminScreens/UsersManager.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomeCustomer />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<CarsManager />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="users" element={<UsersManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
