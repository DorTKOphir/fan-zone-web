import { Comment } from '@/models/comment';

type CommentListItemProps = {
	comment: Comment;
};

const CommentListItem = ({ comment }: CommentListItemProps) => {
	return (
		<div
			key={comment.id}
			className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
		>
			<div className="flex items-center justify-between">
				<div className="font-semibold text-lg">{comment.author}</div>
				<div className="text-sm text-gray-500">
					{new Date(comment.createdAt).toLocaleString()}
				</div>
			</div>
			<p className="mt-2 text-gray-700">{comment.content}</p>
		</div>
	);
};

export default CommentListItem;
