import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import MainLayout from '../layout/MainLayout';
// import HomePage from '@/pages/HomePage/ui/HomePage';


const HomePage = lazy(() => import('@/pages/HomePage/ui/HomePage'));
const Gallery = lazy(() => import('@/pages/gallery/Gallery'));
const Projects = lazy(() => import('@/pages/projects/Projects'));
// const CertificationsPage = lazy(() => import('@/pages/Certifications/CertificationsPage'));
const ContactUs = lazy(() => import('@/pages/contactUs/ui/ContactUs'));

export const routes: RouteObject[] = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: (
                    <HomePage />
                ),
            },

            {
                path: "/gallery",
                element: (
                    <Gallery/>
                ),
            },

            {
                path: "/projects",
                element: (
                    <Projects/>
                ),
            },

                                    {
                path: "/contactus",
                element: (
                    <ContactUs/>
                ),
            },
        ],
    }
];