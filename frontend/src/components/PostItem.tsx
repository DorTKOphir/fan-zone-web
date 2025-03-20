import Post from "@/models/post";
import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
}

export default function PostItem({ post, onLike }: PostItemProps) {
  const { user } = useAuth();
  const isLiked = post.likes.includes(user?._id ?? "");

  return (
    <Card key={post._id} className="p-4">
      <div className="flex items-center space-x-4">
        <UserAvatar profilePicUrl={post.author.profilePicUrl} />
        <div>
          <p className="font-semibold">{post.author.username}</p>
          <p className="text-sm text-gray-500">{new Date(post.dateCreated).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="mt-2">{post.content}</p>
      <div className="flex items-center space-x-4 mt-4">
        <Button variant="ghost" onClick={() => onLike(post._id)}>
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span className="ml-1">{post.likes.length}</span>
        </Button>
        <Button variant="ghost">
          <FaComment />
          <span className="ml-1">{post.comments.length}</span>
        </Button>
      </div>
    </Card>
  );
}
