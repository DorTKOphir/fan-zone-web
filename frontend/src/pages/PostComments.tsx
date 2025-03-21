import CommentListItem from '@/components/CommentListItem';
import { Comment } from '@/models/comment';
import { Post } from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { addCommentOnPost, deleteComment } from '@/services/comment';
import { getPostById } from '@/services/posts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostComments() {
	const { postId } = useParams<{ matchId: string; postId: string }>();
	const [post, setPost] = useState<Post | null>(null);
	const [newComment, setNewComment] = useState<string>('');
	const { user } = useAuth();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				if (postId) {
					const post = await getPostById(postId);
					setPost(post);
				}
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		};

		fetchPost();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (post && user && newComment.trim()) {
			const comment: Comment = await addCommentOnPost(post._id, newComment);

			setPost({
				...post,
				comments: [
					...post.comments,
					{
						...comment,
						author: user,
					},
				],
			});
		}
	};

	const handleDelete = (comment: Comment) => {
		if (post) {
			deleteComment(comment._id);
			setPost((prev) => ({
				...post,
				comments: prev?.comments.filter((p) => p._id !== comment._id) || [],
			}));
		}
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Comments</h1>
			{post ? (
				<>
					<form onSubmit={handleSubmit} className="space-y-4 mb-6">
						<div>
							<label className="block font-medium">Your Comment</label>
							<textarea
								value={newComment}
								onChange={(e) => {
									setNewComment(e.target.value);
								}}
								placeholder="Write your comment here..."
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								rows={4}
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
						>
							Post Comment
						</button>
					</form>
					<div className="space-y-6">
						{post.comments.map((comment) => (
							<CommentListItem
								comment={comment}
								onDelete={handleDelete}
								user={user}
							/>
						))}
					</div>
				</>
			) : (
				<div className="text-center text-red-500 mt-10">{'cannot find post'}</div>
			)}
		</div>
	);
}
