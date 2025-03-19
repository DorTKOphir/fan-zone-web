import api from "./api";
import Post from "@/models/post";

export const getPostsByMatchId = async (matchId: string): Promise<Post[]> => {
  const response = await api.get(`/posts/match/${matchId}`);
  return response.data;
};

export const updatePost = async (postId: string, updatedData: Partial<Post>): Promise<Post> => {
    const response = await api.patch(`/posts/${postId}`, updatedData);
    return response.data;
  };
