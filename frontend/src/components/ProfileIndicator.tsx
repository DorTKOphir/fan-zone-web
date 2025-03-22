import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import UserAvatar from './UserAvatar';

const ProfileIndicator: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	if (!user) return null;

	const { profilePicture, username } = user;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition">
					<UserAvatar profilePicUrl={profilePicture} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-48">
				<div className="px-3 py-2 text-sm font-semibold">{username}</div>

				<DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer">
					Match List
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
					Profile
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => navigate('/chat')} className="cursor-pointer">
					Chat
				</DropdownMenuItem>

				<DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileIndicator;
