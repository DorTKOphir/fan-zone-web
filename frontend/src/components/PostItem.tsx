import { useState } from 'react';
import { Post } from '@/models/post';
import UserAvatar from '@/components/UserAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaHeart, FaRegHeart, FaComment, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/providers/AuthProvider';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';

interface PostItemProps {
	post: Post;
	onLike: (postId: string) => void;
	onDelete: (postId: string) => void;
	onUpdate: (postId: string, newContent: string) => void;
}

export default function PostItem({ post, onLike, onDelete, onUpdate }: PostItemProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const isAuthor = post.author._id === user?._id;
	const isLiked = post.likes.includes(user?._id ?? '');
	const formattedDate = format(new Date(post.dateCreated), 'PPpp');

	const [editMode, setEditMode] = useState(false);
	const [newContent, setNewContent] = useState(post.content);

	const handleSave = () => {
		onUpdate(post._id, newContent);
		exitEditMode();
	};

	const handleDelete = () => {
		onDelete(post._id);
	};

	const enterExitMode = () => {
		setEditMode(true);
	};

	const exitEditMode = () => {
		setNewContent(post.content);
		setEditMode(false);
	};

	return (
		<Card key={post._id} className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<UserAvatar profilePicUrl={post.author.profilePicture} />
					<div>
						<p className="font-semibold">{post.author.username}</p>
						<p className="text-sm text-gray-500">{formattedDate}</p>
					</div>
				</div>

				{isAuthor && (
					<div className="flex space-x-2">
						{editMode ? (
							<>
								<Button
									variant="ghost"
									onClick={handleSave}
									disabled={post.content === newContent}
								>
									Save
								</Button>
								<Button variant="ghost" onClick={exitEditMode}>
									<FaTimes className="text-gray-500" />
								</Button>
							</>
						) : (
							<Button variant="ghost" onClick={enterExitMode}>
								<FaEdit />
							</Button>
						)}
						{!editMode && (
							<Button variant="ghost" onClick={handleDelete}>
								<FaTrash className="text-red-500" />
							</Button>
						)}
					</div>
				)}
			</div>

			{editMode ? (
				<Input
					value={newContent}
					onChange={(e) => setNewContent(e.target.value)}
					className="mt-2"
				/>
			) : (
				<p className="mt-2">{post.content}</p>
			)}

			<div className="flex items-center space-x-4 mt-4">
				<Button variant="ghost" onClick={() => onLike(post._id)}>
					{isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
					<span className="ml-1">{post.likes.length}</span>
				</Button>
				<Button
					variant="ghost"
					onClick={() => navigate(`${location.pathname}/${post._id}`)}
				>
					<FaComment />
					<span className="ml-1">{post.comments.length}</span>
				</Button>
			</div>
		</Card>
	);
}
