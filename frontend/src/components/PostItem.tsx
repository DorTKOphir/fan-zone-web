import { useState } from 'react';
import { Post } from '@/models/post';
import UserAvatar from '@/components/UserAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	FaHeart,
	FaRegHeart,
	FaComment,
	FaEdit,
	FaTrash,
	FaTimes,
} from 'react-icons/fa';
import { useAuth } from '@/providers/AuthProvider';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';

interface PostItemProps {
	post: Post;
	onLike: (postId: string) => void;
	onDelete: (postId: string) => void;
	onUpdate: (postId: string, newContent: string, newImage: File | null) => void;
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
	const [imagePreview, setImagePreview] = useState<string | null>(post.image ?? null);
	const [newImageFile, setNewImageFile] = useState<File | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		onUpdate(post._id, newContent, newImageFile);
		exitEditMode();
	};

	const handleDelete = () => {
		onDelete(post._id);
	};

	const enterEditMode = () => {
		setEditMode(true);
	};

	const exitEditMode = () => {
		setEditMode(false);
		setNewContent(post.content);
		setNewImageFile(null);
		setImagePreview(post.image ?? null);
	};

	return (
		<Card key={post._id} className="p-4 space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<UserAvatar profilePicUrl={post.author.fullProfilePicture} />
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
									disabled={
										post.content === newContent && !newImageFile
									}
								>
									Save
								</Button>
								<Button variant="ghost" onClick={exitEditMode}>
									<FaTimes className="text-gray-500" />
								</Button>
							</>
						) : (
							<Button variant="ghost" onClick={enterEditMode}>
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

			{/* Content */}
			{editMode ? (
				<div className="space-y-3">
					<Input
						value={newContent}
						onChange={(e) => setNewContent(e.target.value)}
					/>
					<div className="space-y-1">
						<Label htmlFor={`post-image-${post._id}`}>Change Image</Label>
						<Input
							id={`post-image-${post._id}`}
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>
					{imagePreview && (
						<div className="w-full max-h-[300px] flex justify-center items-center overflow-hidden rounded border">
							<img
								src={imagePreview}
								alt="Preview"
								className="max-h-[300px] w-auto object-contain"
							/>
						</div>
					)}
				</div>
			) : (
				<>
					<p>{post.content}</p>
					{post.image && (
						<div className="w-full max-h-[300px] flex justify-center items-center overflow-hidden rounded border">
							<img
								src={post.image}
								alt="Post"
								className="max-h-[300px] w-auto object-contain"
							/>
						</div>
					)}
				</>
			)}

			{/* Actions */}
			<div className="flex items-center space-x-4">
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
