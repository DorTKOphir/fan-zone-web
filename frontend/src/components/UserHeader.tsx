import User from '@/models/user';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

interface UserHeaderProps {
	user: User;
}

export default function UserHeader({ user }: UserHeaderProps) {
	const navigate = useNavigate();

	if (!user) {
		return null;
	}

	const navigateToProfile = () => {
		navigate(`/profile/${user._id}`);
	};

	return (
		<div className="flex items-center space-x-4 cursor-pointer" onClick={navigateToProfile}>
			<UserAvatar profilePicUrl={user.fullProfilePicture} />
			<div>
				<p className="font-semibold">{user.username}</p>
			</div>
		</div>
	);
}
