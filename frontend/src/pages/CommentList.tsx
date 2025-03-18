import CommentListItem from '@/components/CommentListItem';
import { Comment } from '@/models/comment';
import { Post } from '@/models/post';
import { getPostById } from '@/services/posts';
import { useEffect, useState } from 'react';

export default function CommentList() {
	const [post, setPost] = useState<Post>();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await getPostById('67d9d275e1e693a13a8b6ed0');
				debugger;
				const parsedComments = data.comments.map((comment: Comment) => ({
					id: comment._id,
					author: comment.author,
					content: comment.content,
					dateCreated: new Date(comment.dateCreated).toLocaleString(),
				}));

				const parsedPost: Post = {
					author: data.author,
					content: data.content,
					dateCreated: new Date(data.dateCreated).toLocaleString(),
					comments: parsedComments,
				};

				setPost(parsedPost);
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		};

		fetchPost();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (post?.author.username.trim() && post.content.trim()) {
			const newComment: Comment = {
				_id: 'aedstjsrfdyjmk',
				author: { _id: 'sfbg', username: 'sfbsfrb', email: 'fsfrg' },
				content: post.content,
				dateCreated: new Date().toISOString(),
			};
			setPost({ ...post, comments: [...post.comments, newComment] });
		}
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Comments</h1>
			{post ? (
				<>
					{' '}
					<form onSubmit={handleSubmit} className="space-y-4 mb-6">
						<div>
							<label className="block font-medium">Your Comment</label>
							<textarea
								value={post.content}
								// onChange={(e) => setContent(e.target.value)}
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
							<CommentListItem comment={comment} />
						))}
					</div>
				</>
			) : (
				<div className="text-center text-red-500 mt-10">{'cannot find post'}</div>
			)}
		</div>
	);
}
