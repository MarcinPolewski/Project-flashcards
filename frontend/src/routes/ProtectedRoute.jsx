import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";

const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
      console.log("No token in ProtectedRoute, redirecting to login!");
      return <Navigate to="/login" />;
    } else {
        console.log("Token in ProtectedRoute: ", token);
    }

    return <Outlet />;
};

export default ProtectedRoute