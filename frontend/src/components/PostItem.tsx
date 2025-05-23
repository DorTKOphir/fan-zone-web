import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Post } from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { format } from 'date-fns';
import { useState } from 'react';
import { FaComment, FaEdit, FaHeart, FaRegHeart, FaTimes, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';

interface PostItemProps {
	post: Post;
	onLike: (postId: string) => void;
	onDelete: (postId: string) => void;
	onUpdate: (
		postId: string,
		newContent: string,
		newImage: File | null,
		imageDeleted: boolean,
	) => void;
	showCommentsButton?: boolean;
}

export default function PostItem({
	post,
	onLike,
	onDelete,
	onUpdate,
	showCommentsButton = true,
}: PostItemProps) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const isAuthor = post.author._id === user?._id;
	const isLiked = post.likes.includes(user?._id ?? '');
	const formattedDate = format(new Date(post.dateCreated), 'PPpp');

	const [editMode, setEditMode] = useState(false);
	const [newContent, setNewContent] = useState(post.content);
	const [imagePreview, setImagePreview] = useState<string | null>(post.image ?? null);
	const [newImageFile, setNewImageFile] = useState<File | null>(null);
	const [imageDeleted, setImageDeleted] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImageFile(file);
			setImageDeleted(false); // user is uploading a new image
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImagePreview(null);
		setNewImageFile(null);
		setImageDeleted(true);
	};

	const handleSave = () => {
		onUpdate(post._id, newContent, newImageFile, imageDeleted);
		exitEditMode();
	};

	const handleDelete = () => {
		onDelete(post._id);
	};

	const enterEditMode = () => {
		setEditMode(true);
		setNewContent(post.content);
		setImagePreview(post.image ?? null);
		setNewImageFile(null);
		setImageDeleted(false);
	};

	const exitEditMode = () => {
		setEditMode(false);
	};

	const navigateToProfile = () => {
		navigate(`/profile/${post.author._id}`);
	};

	return (
		<div className="rounded-xl shadow bg-white p-4 hover:shadow-md transition">
			<Card key={post._id} className="p-4 space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4" onClick={navigateToProfile}>
						<UserHeader user={post.author} />
						<p className="text-sm text-gray-500">{formattedDate}</p>
					</div>

					{isAuthor && (
						<div className="flex space-x-2">
							{editMode ? (
								<>
									<Button
										className="cursor-pointer"
										variant="ghost"
										onClick={handleSave}
										disabled={
											post.content === newContent &&
											!newImageFile &&
											!imageDeleted
										}
									>
										Save
									</Button>
									<Button
										variant="ghost"
										className="cursor-pointer"
										onClick={exitEditMode}
									>
										<FaTimes className="text-gray-500" />
									</Button>
								</>
							) : (
								<Button
									variant="ghost"
									className="cursor-pointer"
									onClick={enterEditMode}
								>
									<FaEdit />
								</Button>
							)}
							{!editMode && (
								<Button
									variant="ghost"
									className="cursor-pointer"
									onClick={handleDelete}
								>
									<FaTrash className="text-red-500" />
								</Button>
							)}
						</div>
					)}
				</div>

				{editMode ? (
					<div className="space-y-3">
						<Input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
						<div className="space-y-1">
							<Label htmlFor={`post-image-${post._id}`}>Change Image</Label>
							<Input
								id={`post-image-${post._id}`}
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</div>
						{editMode && !imageDeleted && (imagePreview || post.image) && (
							<div className="w-full flex flex-col items-center gap-2 rounded border p-2 bg-muted">
								<img
									src={imagePreview ?? post.image!}
									alt="Post Preview"
									className="max-h-[300px] w-auto object-contain"
								/>
								<Button
									variant="destructive"
									className="cursor-pointer"
									size="sm"
									onClick={handleRemoveImage}
								>
									Remove Image
								</Button>
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

				<div className="flex items-center space-x-4">
					<Button
						variant="ghost"
						className="cursor-pointer"
						onClick={() => onLike(post._id)}
					>
						{isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
						<span className="ml-1">{post.likes.length}</span>
					</Button>
					{showCommentsButton && (
						<Button
							variant="ghost"
							className="cursor-pointer"
							onClick={() => navigate(`/${post.matchId}/${post._id}`)}
						>
							<FaComment />
							<span className="ml-1">{post.comments.length}</span>
						</Button>
					)}
				</div>
			</Card>
		</div>
	);
}
