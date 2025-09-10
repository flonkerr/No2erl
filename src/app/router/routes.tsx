import { lazy } from "react";
import type { RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import ProductPage from "../../pages/Product/ui/ProductPage";
// import HomePage from '@/pages/HomePage/ui/HomePage';

const HomePage = lazy(() => import("../../pages/HomePage/ui/HomePage"));
const Gallery = lazy(() => import("../../pages/gallery/ui/Gallery"));
const Projects = lazy(() => import("../../pages/projects/ui/Projects"));
const Certifications = lazy(() => import("../../pages/certifications/ui/Certifications"));
const ContactUs = lazy(() => import("../../pages/contactUs/ui/ContactUs"));
const ProfileMenu = lazy(() => import("../../pages/profile/ui/Profile"));
const Product = lazy(() => import("../../pages/Product/ui/Product"));
const Register = lazy(() => import("../../pages/auth/register/ui/Register"));
const Login = lazy(() => import("../../pages/auth/login/ui/Login"));


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
        path: "/certifications",
        element: <Certifications />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
      }
    ],
  },
];
