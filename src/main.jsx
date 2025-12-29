import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./loginpage/login.jsx";
import Signup from "./signuppage/signup.jsx";
import Homepage from "./HOMEPAGE/homepage.jsx";
import Message from "./message/message.jsx";
import Createadmin from "./create-admin/createadmin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/homepage",
    element:<Homepage/>
  },{
    path:"/message",
    element:<Message/>
  },{
    path:"/createadmin",
    element:<Createadmin/>

  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
