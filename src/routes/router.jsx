import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthPage from "../pages/AuthPage";
import ErrorPages from "../pages/ErrorPages";
import PrivateRoute from "../provider/PrivateRoute";
import AddCampaign from "../pages/AddCampaign";
import AllCampaign from "../pages/AllCampaign";
import DetailsPage from "../pages/DetailsPage";
import MyCampaign from "../pages/MyCampaign";
import UpdateCampaign from "../pages/UpdateCampaign";
import MyDonations from "../pages/MyDonations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        loader: () => fetch("http://localhost:5000/campaigns"),
      },
      {
        path: "/addCampaign",
        element: (
          <PrivateRoute>
            <AddCampaign></AddCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "/campaigns",
        element: <AllCampaign></AllCampaign>,
      },
      {
        path: "/campaign/:id",
        element: (
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/campaigns/${params.id}`), // Fetch specific campaign by ID
      },
      {
        path: "/myCampaign",
        element: (
          <PrivateRoute>
            <MyCampaign></MyCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateCampaign/:id",
        element: (
          <PrivateRoute>
            <UpdateCampaign></UpdateCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "/myDonations",
        element: (
          <PrivateRoute>
            <MyDonations></MyDonations>
          </PrivateRoute>
        ),
      },

      {
        path: "/auth",
        element: <AuthPage></AuthPage>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPages></ErrorPages>,
  },
]);

export default router;
