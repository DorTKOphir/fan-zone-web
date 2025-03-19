import { Comment } from '@/models/comment';
import User from '@/models/user';
import { RiDeleteBin6Line } from 'react-icons/ri';

type CommentListItemProps = {
	comment: Comment;
	onDelete: (comment: Comment) => void;
	user: User;
};

const CommentListItem = ({ comment, onDelete, user }: CommentListItemProps) => {
	return (
		<div
			key={comment._id}
			className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
		>
			<div className="flex items-center justify-between">
				<div className="font-semibold text-lg">{comment.author.username}</div>
			</div>
			<p className="mt-2 text-gray-700">{comment.content}</p>
			<div className="flex items-center justify-between mt-2">
				<div className="text-sm text-gray-500">{comment.dateCreated}</div>
				{comment.author._id === user._id && (
					<button
						onClick={() => onDelete(comment)}
						className="text-red-500 hover:text-red-700 transition"
						aria-label="Delete comment"
					>
						<RiDeleteBin6Line />
					</button>
				)}
			</div>
		</div>
	);
};

export default CommentListItem;
