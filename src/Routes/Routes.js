import { createBrowserRouter } from "react-router-dom";
import AddStudent from "../Components/AddStudent/AddStudent";
import EditStudent from "../Components/EditStudent/EditStudent";

import Main from "../Components/Main/Main";
import ManageStudent from "../Components/ManageStudent/ManageStudent";
import ViewDetail from "../Components/ViewDetail/ViewDetail";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <AddStudent></AddStudent>,
      },
      {
        path: "/manage-student",
        element: <ManageStudent></ManageStudent>,
      },
      {
        path: "view/:id",
        element: <ViewDetail></ViewDetail>,
        loader: ({ params }) =>
          fetch(`https://student-brown.vercel.app/view/${params.id}`),
      },
      {
        path: "edit/:id",
        element: <EditStudent></EditStudent>,
        loader: ({ params }) =>
          fetch(`https://student-brown.vercel.app/view/${params.id}`),
      },
    ],
  },
]);
