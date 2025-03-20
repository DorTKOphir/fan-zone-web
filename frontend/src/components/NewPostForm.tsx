import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPost } from "@/services/posts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

const postSchema = z.object({
  content: z.string().min(3, "Post content must be at least 3 characters long"),
});

interface NewPostFormProps {
  matchId: string;
  onPostCreated: () => void;
}

export default function NewPostForm({ matchId, onPostCreated }: NewPostFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: { content: string }) => {
    if (!user) return;
    setLoading(true);

    try {
      await createPost({
        content: data.content,
        author: user._id,
        matchId,
        dateCreated: new Date().toISOString(),
      });
      reset();
      onPostCreated();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea {...register("content")} placeholder="Write your post..." />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Create Post"}
      </Button>
    </form>
  );
}
