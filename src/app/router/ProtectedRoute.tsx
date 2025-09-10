import { Navigate } from "react-router";

interface ProtectedRouteProps {
    isAuth: boolean;
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {

    const isAuth = false;

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}