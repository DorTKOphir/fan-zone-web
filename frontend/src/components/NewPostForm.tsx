import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createPost, getPostSuggestion } from '@/services/posts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useRef, useState } from 'react';
import { Match } from '@/models/match';

const postSchema = z.object({
	content: z.string().min(3, 'Post content must be at least 3 characters long'),
});

interface NewPostFormProps {
	match: Match;
	onPostCreated: () => void;
}

export default function NewPostForm({ match, onPostCreated }: NewPostFormProps) {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [contentPlaceHolder, setContentPlaceHolder] = useState('Loading suggestion...');
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const matchIdRef = useRef<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(postSchema),
	});

	useEffect(() => {
		const loadSuggestion = async () => {
			const currentMatchId = String(match.id);
			if (matchIdRef.current === currentMatchId) return;
			matchIdRef.current = currentMatchId;

			try {
				const suggestion = await getPostSuggestion(match);
				setContentPlaceHolder(suggestion);
			} catch (error) {
				console.error('Failed to load suggestion:', error);
			}
		};

		if (match) {
			loadSuggestion();
		}
	}, [match]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setImageFile(null);
			setImagePreview(null);
		}
	};

	const onSubmit = async (data: { content: string }) => {
		if (!user) return;
		setLoading(true);

		try {
			await createPost(
				data.content,
				user._id,
				String(match.id),
				new Date().toISOString(),
				imageFile,
			);
			reset();
			setImageFile(null);
			setImagePreview(null);
			onPostCreated();
		} catch (error) {
			console.error('Failed to create post:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Textarea {...register('content')} className="min-h-[150px]" placeholder={contentPlaceHolder} />
			{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

			{imagePreview && (
				<Card className="w-full max-w-sm overflow-hidden">
					<CardContent className="p-0">
						<img
							src={imagePreview}
							alt="Image preview"
							className="w-full h-auto object-cover"
						/>
					</CardContent>
				</Card>
			)}

			<div className="flex items-end gap-4">
				<div className="space-y-2">
					<Label htmlFor="image">Attach Image</Label>
					<Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
				</div>

				<Button type="submit" disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700 w-fit px-4 py-2 text-sm">
					{loading ? 'Posting...' : 'Create Post'}
				</Button>
			</div>
		</form>
	);
}
