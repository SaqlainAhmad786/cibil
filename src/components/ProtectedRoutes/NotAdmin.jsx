import { useAuth } from "../../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { memo, useMemo, useRef } from "react";

function NotAdmin({ Component }) {
    const { userData } = useAuth();
    const tokenRef = useRef(localStorage.getItem("token"));

    // Handle loading state if userData is not yet available
    if (!userData) return null; // Or a loading indicator

    const shouldNavigate = useMemo(() => userData.role === "user", [userData.role]);

    if (!tokenRef.current) return <Navigate to="/login" replace />;

    if (shouldNavigate) return <Navigate to="/overview" replace />;

    return <Component />;
}

export default memo(NotAdmin, (prevProps, nextProps) => {
    return prevProps.Component === nextProps.Component;
});