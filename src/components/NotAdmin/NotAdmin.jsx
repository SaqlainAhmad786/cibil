import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";
import { memo, useMemo } from "react";

function NotAdmin({ Component }) {
    const { userData } = useAuth();

    // Handle loading state if userData is not yet available
    if (!userData) return null; // Or a loading indicator

    const shouldNavigate = useMemo(() => userData.role === "user", [userData.role]);

    if (shouldNavigate) return <Navigate to="/overview" replace />;

    return <Component />;
}

export default memo(NotAdmin, (prevProps, nextProps) => {
    return prevProps.Component === nextProps.Component;
});