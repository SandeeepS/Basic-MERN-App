import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import UpdateProfile from "./screens/UpdateProfile.jsx";
import Home from "./components/Home.jsx";
import AdminLogin from "./screens/AdminLogin.jsx";
import AdminProfile from "./screens/AdminProfile.jsx";
import AddUserAdmin from "./screens/AddUserAdmin.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/** admin route  */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Pirvate Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />

        {/* admin private route */}
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/addUser" element={<AddUserAdmin />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
