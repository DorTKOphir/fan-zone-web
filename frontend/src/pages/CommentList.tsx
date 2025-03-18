import CommentListItem from '@/components/CommentListItem';
import { Comment } from '@/models/comment';
import { useState } from 'react';

const initialComments: Comment[] = [
	{
		id: 1,
		author: 'John Doe',
		content: 'Great match! I think Manchester United played really well.',
		createdAt: '2025-03-18T14:30:00Z',
	},
	{
		id: 2,
		author: 'Jane Smith',
		content: 'I disagree, Chelsea was the stronger team. They should have won.',
		createdAt: '2025-03-18T15:00:00Z',
	},
	{
		id: 3,
		author: 'Alex Johnson',
		content: 'The referee was questionable, but it was a thrilling match nonetheless!',
		createdAt: '2025-03-18T16:00:00Z',
	},
];

export default function CommentList() {
	const [comments, setComments] = useState<Comment[]>(initialComments);
	const [author, setAuthor] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (author.trim() && content.trim()) {
			const newComment: Comment = {
				id: comments.length + 1,
				author,
				content,
				createdAt: new Date().toISOString(),
			};
			setComments([newComment, ...comments]); // Adds the new comment at the top
			setAuthor('');
			setContent('');
		}
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Comments</h1>
			<form onSubmit={handleSubmit} className="space-y-4 mb-6">
				<div>
					<label className="block font-medium">Your Comment</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
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
				{comments.map((comment) => (
					<CommentListItem comment={comment} />
				))}
			</div>
		</div>
	);
}
