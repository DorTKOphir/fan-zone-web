import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Comment } from '@/models/comment';
import User from '@/models/user';
import { format } from 'date-fns';
import { RiDeleteBin6Line } from 'react-icons/ri';
import UserHeader from './UserHeader';

type CommentItemProps = {
	comment: Comment;
	onDelete: (comment: Comment) => void;
	user: User | null;
};

const CommentItem = ({ comment, onDelete, user }: CommentItemProps) => {
	return (
		<Card className="hover:bg-gray-50 transition">
			<CardHeader>
				<UserHeader user={comment.author} />
			</CardHeader>
			<CardContent>
				<p className="text-gray-700">{comment.content}</p>
				<div className="flex items-center justify-between mt-2">
					<div className="text-sm text-gray-500">
						{format(new Date(comment.dateCreated), 'PPpp')}
					</div>
					{comment.author._id === user?._id && (
						<Button
							variant="ghost"
							onClick={() => onDelete(comment)}
							className="text-red-500 hover:text-red-700 transition"
							aria-label="Delete comment"
						>
							<RiDeleteBin6Line />
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default CommentItem;
