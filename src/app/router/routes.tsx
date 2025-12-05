import { lazy } from "react";
import type { RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import ProductPage from "../../pages/Product/ui/ProductPage";
import CartPage from "../../pages/Cart/ui/CartPage";
import N404 from "../../pages/NotFounderror/N404"
import Login from "../../pages/auth/login/ui/Login"
import Register from "../../pages/auth/register/ui/Register"
import ViewProject from "../../pages/projects/ui/ViewProject"
import ViewProject2 from "../../pages/projects/ui/ViewProject2"
import ViewProject3 from "../../pages/projects/ui/ViewProject3"


const HomePage = lazy(() => import("../../pages/HomePage/ui/HomePage"));
const Gallery = lazy(() => import("../../pages/gallery/ui/Gallery"));
const Projects = lazy(() => import("../../pages/projects/ui/Projects"));
const Aboutus = lazy(() => import("../../pages/aboutus/ui/Aboutus"));
const ContactUs = lazy(() => import("../../pages/contactUs/ui/ContactUs"));
const ProfileMenu = lazy(() => import("../../pages/profile/ui/Profile"));
const Product = lazy(() => import("../../pages/Product/ui/Product"));

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const HomePage = lazy(() =>
//   wait(500).then(() => import("../../pages/HomePage/ui/HomePage"))
// );


export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/gallery",
        element: <Gallery />,
      },

      {
        path: "/projects",
        element: <Projects />,
      },

      {
        path: "/contactus",
        element: <ContactUs />,
      },

      {
        path: "/aboutus",
        element: <Aboutus />,
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute isAuth>
            <ProfileMenu />
          </ProtectedRoute>
        ),
      },

      {
        path: "/Product",
        element: <Product />,
      },

      {
        path: "/products/:id",
        element: (
          <ProductPage />
        ),
      },

      {
        path: "/cart",
        element: (
          <ProtectedRoute isAuth>
            <CartPage />
          </ProtectedRoute>

        ),
      },

      {
        path: "/ViewProject",
        element: <ViewProject />
      },

      {
        path: "/ViewProject2",
        element: <ViewProject2 />
      },

      {
        path: "/ViewProject3",
        element: <ViewProject3 />
      },

    ],
  },

  {
    path: "*",
    element: (
      <N404 />
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
