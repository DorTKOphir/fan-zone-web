import { Comment } from '@/models/comment';

type CommentListItemProps = {
	comment: Comment;
};

const CommentListItem = ({ comment }: CommentListItemProps) => {
	return (
		<div
			key={comment._id}
			className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
		>
			<div className="flex items-center justify-between">
				<div className="font-semibold text-lg">{comment.author.username}</div>
				<div className="text-sm text-gray-500">{comment.dateCreated}</div>
			</div>
			<p className="mt-2 text-gray-700">{comment.content}</p>
		</div>
	);
};

export default CommentListItem;
