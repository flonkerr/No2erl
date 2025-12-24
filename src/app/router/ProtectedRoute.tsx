import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {

    const user = localStorage.getItem("loggedInUser");
    const isAuth = !!user;

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}