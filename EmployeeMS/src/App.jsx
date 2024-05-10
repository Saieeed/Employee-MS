import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
// import Logout from "./Components/Logout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./Components/AddEmployee";

import AddCategory from "./Components/AddCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested routes for Dashboard */}
          <Route path="" element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="category" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="add_employee" element={<AddEmployee />} />
        </Route>
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
