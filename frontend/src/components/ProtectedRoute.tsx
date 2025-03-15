// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const ProtectedRoute = () => {
	const { accessToken } = useAuth();
	return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
