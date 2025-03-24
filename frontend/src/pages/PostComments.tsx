import CommentItem from '@/components/CommentItem';
import PostItem from '@/components/PostItem';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePosts } from '@/hooks/usePosts';
import { Comment } from '@/models/comment';
import { useAuth } from '@/providers/AuthProvider';
import { addCommentOnPost, deleteComment } from '@/services/comment';
import { getPostById } from '@/services/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const commentSchema = z.object({
	content: z.string().min(1, 'Comment cannot be empty'),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function PostComments() {
	const { matchId, postId } = useParams<{ matchId: string; postId: string }>();
	const navigate = useNavigate();
	const { user } = useAuth();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<CommentFormValues>({ resolver: zodResolver(commentSchema) });

	const fetchPosts = useCallback(async () => {
		if (postId) {
			try {
				const post = await getPostById(postId);
				return [post];
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		}
		return [];
	}, [postId]);

	const {
		posts,
		loading: postLoading,
		onLike,
		onDelete,
		onUpdate,
		loadPosts,
	} = usePosts(fetchPosts);

	if (!posts || posts.length === 0) {
		return <div className="text-center text-red-500 mt-10">Cannot find post</div>;
	}

	const post = posts[0];

	const onSubmit = async (data: CommentFormValues) => {
		if (post && user) {
			await addCommentOnPost(post._id, data.content);
			loadPosts();
			reset();
		}
	};

	const handleDelete = async (comment: Comment) => {
		if (post) {
			await deleteComment(comment._id);
			loadPosts();
		}
	};

	const handlePostDelete = (postId: string) => {
		onDelete(postId);
		matchId && navigate(`/${matchId}`);
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			<PostItem
				onUpdate={onUpdate}
				onDelete={handlePostDelete}
				onLike={onLike}
				post={post}
				showCommentsButton={false}
			/>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
				<Textarea {...register('content')} placeholder="Write your comment..." />
				{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
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
		</div>
	);
}
