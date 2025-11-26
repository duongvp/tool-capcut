import MainLayout from "@/layouts/MainLayout"
import { handleMapRoutes } from "@/helpers/handleMapRoutes"
import type { RouteObject } from "react-router-dom"
import { items } from "@/components/app-sidebar"
import LoginPage from "@/features/auth/login/page";
import AuthLayout from "@/layouts/AuthLayout";
import ForgotPasswordPage from "@/features/auth/forgot-password/page";

console.log("...handleMapRoutes(items, true)", handleMapRoutes(items, true));

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />,
            },
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...handleMapRoutes(items, true), // 👈 Tự động map toàn bộ route,
            // {
            //     path: "settings/users",
            //     element: <div>Users Page</div>,
            // },
            // {
            //     path: "settings/reports",
            //     element: <div>Roles Page</div>,
            // },
            // {
            //     path: "settings/users/roles/edit",
            //     element: <div>Edit Role</div>,
            // },
        ],
    },
]
