import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

function ProtectedRoute({ children }) {
    const { auth, setAuth } = useAuth();

    const token = localStorage.getItem('token');
    if (token) {
        setAuth(token);
    }

    if (auth) {
        return <Navigate to="/" />;
    }

    return children
}

export default ProtectedRoute
