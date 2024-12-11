import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = () => {
    const { auth } = useAuth();
    console.log(auth)
    if (!auth) {
        return <Navigate to="/login" />;
    }


};

export default ProtectedRoute;
