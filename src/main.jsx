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
import Verify from "../verify_page/verify.jsx";
import Analyse_job from "../analyse_job/analyse_job.jsx";
import Marks_update from "../marks-update/marks-update.jsx";
import Marks_get from "../marks-get/marks-get.jsx";
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
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/message",
    element: <Message />,
  },
  {
    path: "/createadmin",
    element: <Createadmin />,
  },
  {
    path:"/analyse",
    element:<Analyse_job/>
  },{
    path:"/marks-update",
    element:<Marks_update/>
  },{
    path:"/mark-get",
    element:<Marks_get/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
