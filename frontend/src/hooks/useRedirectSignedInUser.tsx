import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectSignedInUser = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);
};

export default useRedirectSignedInUser;
