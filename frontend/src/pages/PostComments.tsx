import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { addCommentOnPost, deleteComment } from '@/services/comment';
import { getPostById } from '@/services/posts';
import { Post } from '@/models/post';
import { Comment } from '@/models/comment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import CommentItem from '@/components/CommentItem';

const commentSchema = z.object({
	content: z.string().min(1, 'Comment cannot be empty'),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function PostComments() {
	const { postId } = useParams<{ matchId: string; postId: string }>();
	const [post, setPost] = useState<Post | null>(null);
	const { user } = useAuth();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<CommentFormValues>({ resolver: zodResolver(commentSchema) });

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
	}, [postId]);

	const onSubmit = async (data: CommentFormValues) => {
		if (post && user) {
			const comment: Comment = await addCommentOnPost(post._id, data.content);
			setPost((prev) =>
				prev
					? { ...prev, comments: [{ ...comment, author: user }, ...prev.comments] }
					: prev,
			);
			reset();
		}
	};

	const handleDelete = (comment: Comment) => {
		if (post) {
			deleteComment(comment._id);
			setPost((prev) =>
				prev
					? { ...prev, comments: prev.comments.filter((c) => c._id !== comment._id) }
					: prev,
			);
		}
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			{post ? (
				<>
					<Card className="mb-6 border-2 border-blue-500 shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-blue-600">
								{post.author.username}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-800 text-lg font-medium">{post.content}</p>
							<p className="text-sm text-gray-500 mt-2">
								Created: {new Date(post.dateCreated).toLocaleString()}
							</p>
						</CardContent>
					</Card>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
						<Textarea {...register('content')} placeholder="Write your comment..." />
						{errors.content && (
							<p className="text-red-500 text-sm">{errors.content.message}</p>
						)}
						<Button type="submit" className="w-full">
							Post Comment
						</Button>
					</form>

					<div className="space-y-6">
						{post.comments.map((comment) => (
							<CommentItem
								key={comment._id}
								comment={comment}
								onDelete={handleDelete}
								user={user}
							/>
						))}
					</div>
				</>
			) : (
				<div className="text-center text-red-500 mt-10">Cannot find post</div>
			)}
		</div>
	);
}
