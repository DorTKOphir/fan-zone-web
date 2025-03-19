import { Request, Response } from "express";
import postModel from "../models/postModel";
import commentModel from "../models/commentModel";

class PostController {
  async getById(req: Request, res: Response) {
    try {
      const post = await this.populatePost(postModel.findById(req.params.id));

      if (!post) {
        console.error('Post not found');
        return res.status(404).json({ error: 'Post not found' });
      }

      console.log('Post returned successfully');
      res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Error fetching post" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { content, matchId } = req.body;
      const author = (req as any).user._id;
      const file = (req as any).file;
      
      if (!content || !file) {
        console.error('Content or image is required');
        return res.status(400).json({ error: 'Content or image is required' });
      }

      const newPost = new postModel({
        author,
        comments: [],
        content,
        matchId, 
        dateCreated: new Date(),
        image: file ? `/uploads/post_images/${file.filename}` : undefined,
      });

      await newPost.save();
      const populatedPost = await this.populatePost(postModel.findById(newPost._id));

      console.log('Post created successfully');
      res.status(201).json(populatedPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateBody: { [key: string]: any } = {};

      for (const field of this.getUpdateFields()) {
        if (req.body[field] !== undefined) {
          updateBody[field] = req.body[field];
        }
      }

      if (Object.keys(updateBody).length === 0) {
        console.error('No valid fields provided for update');
        return res.status(400).json({ error: 'No valid fields provided for update' });
      }

      const updatedPost = await this.populatePost(
        postModel.findByIdAndUpdate(req.params.id, updateBody, { new: true })
      );

      if (!updatedPost) {
        console.error('Post not found');
        return res.status(404).json({ error: 'Post not found' });
      }

      console.log('Post updated sucessfully');
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Error updating post" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedPost = await postModel.findByIdAndDelete(req.params.id);

      if (!deletedPost) {
        console.error('Post not found');
        return res.status(404).json({ error: 'Post not found' });
      }

      await commentModel.deleteMany({ _id: { $in: deletedPost.comments } });

      console.log('Post deleted successfully');
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  }

  async getPostsByMatchId(req: Request, res: Response) {
    try {
      const { matchId } = req.params;
      if (!matchId) {
        console.error('Match ID is required');
        return res.status(400).json({ message: 'Match ID is required.' });
      }

      const posts = await this.populatePost(postModel.find({ matchId }));

      console.log('Posts returned successfully');
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts by matchId:', error);
      return res.status(500).json({ message: "Error fetching posts by matchId" });
    }
  }

  private async populatePost(query: any) {
    return query.populate([
      { path: "author" },
      { 
        path: "comments", 
        populate: { path: "author" }
      }
    ]);
  }

  protected getUpdateFields(): string[] {
    return ['content', 'likes'];
  }
}

export default new PostController();
