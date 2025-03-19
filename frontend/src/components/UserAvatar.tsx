import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  profilePicUrl: string | null;
}

export default function UserAvatar({ profilePicUrl }: UserAvatarProps) {
  return (
    <Avatar className="w-14 h-14">
      {profilePicUrl ? (
        <AvatarImage className="w-14 h-14 rounded-full" src={profilePicUrl} alt="Profile" />
      ) : (
        <AvatarFallback className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-full">
          <FaUserCircle className="w-14 h-14 text-gray-500" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
