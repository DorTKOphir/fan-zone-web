import CommentListItem from '@/components/CommentListItem';
import { Comment, NewComment } from '@/models/comment';
import { IPost, Post } from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { addCommentOnPost, deleteComment } from '@/services/comment';
import { getPostById } from '@/services/posts';
import { useEffect, useState } from 'react';

export default function CommentList() {
	const [post, setPost] = useState<Post>();
	const [newComment, setNewComment] = useState<NewComment>();
	const { user } = useAuth();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data: IPost = await getPostById('67d9d275e1e693a13a8b6ed0');

				const parsedComments: Comment[] = data.comments.map((comment: Comment) => ({
					_id: comment._id,
					author: comment.author,
					content: comment.content,
					dateCreated: new Date(comment.dateCreated).toLocaleString(),
				}));

				const parsedPost: Post = {
					id: data._id,
					author: data.author,
					content: data.content,
					dateCreated: new Date(data.dateCreated).toLocaleString(),
					comments: parsedComments,
				};

				setPost(parsedPost);
				setNewComment({ postId: parsedPost.id });
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		};

		fetchPost();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (post && user && newComment?.postId && newComment.content?.trim()) {
			const comment: Comment = await addCommentOnPost(newComment);

			setPost({
				...post,
				comments: [
					...post.comments,
					{
						...comment,
						dateCreated: new Date(comment.dateCreated).toLocaleString(),
						author: user,
					},
				],
			});
		}
	};

	const handleDelete = (comment: Comment) => {
		if (post) {
			deleteComment(comment._id);
			const newComments = removeItem(post?.comments, comment);
			setPost({ ...post, comments: newComments });
		}
	};

	function removeItem<T>(arr: Array<T>, value: T): Array<T> {
		const index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Comments</h1>
			{post ? (
				<>
					<form onSubmit={handleSubmit} className="space-y-4 mb-6">
						<div>
							<label className="block font-medium">Your Comment</label>
							<textarea
								value={newComment?.content}
								onChange={(e) => {
									if (newComment) {
										setNewComment({ ...newComment, content: e.target.value });
									}
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
