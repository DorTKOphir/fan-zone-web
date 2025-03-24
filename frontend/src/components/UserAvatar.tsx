import { FaUserCircle } from 'react-icons/fa';

interface UserAvatarProps {
	profilePicUrl: string | null;
}

export default function UserAvatar({ profilePicUrl }: UserAvatarProps) {
	return (
		<div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {profilePicUrl ? (
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-14 h-14 object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FaUserCircle className="w-14 h-14 text-gray-500" />
      )}
    </div>
	);
}
