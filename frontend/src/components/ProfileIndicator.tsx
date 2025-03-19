import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';

const ProfileIndicator: React.FC = ({}) => {
	const {
		user: { profilePicUrl, username },
		logout,
	} = useAuth();
	const navigate = useNavigate();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition">
					<Avatar className="w-14 h-14">
						{profilePicUrl ? (
							<AvatarImage className="w-14 h-14 rounded-full" src={profilePicUrl} alt="Profile" />
						) : (
							<AvatarFallback className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full">
								<FaUserCircle className="w-14 h-14 text-gray-500" />
							</AvatarFallback>
						)}
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-48">
				<div className="px-3 py-2 text-sm font-semibold">{username}</div>
				<DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileIndicator;
