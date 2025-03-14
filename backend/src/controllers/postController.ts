import { Request, Response } from 'express';
import postModel from '../models/postModel';

class PostController {
  async getById(req: Request, res: Response) {
    try {
      const post = await postModel.findById(req.params.id).populate('author', 'username');
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { author, content } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const newPost = new postModel({
        author,
        content,
        dateCreated: new Date(),
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
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
        return res.status(400).json({ error: 'No valid fields provided for update' });
      }

      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        updateBody,
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedPost = await postModel.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  }

  async getPostsByMatchId(req: Request, res: Response) {
    res.status(501).json({ error: 'Function not implemented yet' });
  }

  protected getUpdateFields(): string[] {
    return ['content', 'likes'];
}
}

export default new PostController();
