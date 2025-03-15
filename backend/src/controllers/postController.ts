import { Request, Response } from 'express';
import postModel from '../models/postModel';
import commentModel from '../models/commentModel';

class PostController {
  async getById(req: Request, res: Response) {
    try {
      const post = await postModel
        .findById(req.params.id)
        .populate("author", "_id username")
        .populate({
          path: "comments",
          populate: { path: "author", select: "_id username" },
        });
      
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
        comments: [],
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
      ).populate("author", "_id username")
       .populate({
         path: "comments",
         populate: { path: "author", select: "_id username" },
       });

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

      await commentModel.deleteMany({ _id: { $in: deletedPost.comments } });

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  }

  async getPostsByMatchId(req: Request, res: Response) {
    try {
        const { matchId } = req.params;
        if (!matchId) {
            return res.status(400).json({ message: "Match ID is required." });
        }

        const posts = await postModel.find({ matchId })
            .populate("author", "_id username")
            .populate({
                path: "comments",
                populate: { path: "author", select: "_id username" },
            });

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts by matchId:", error);
        return res.status(500).json({ message: "Server error" });
    }
  };


  protected getUpdateFields(): string[] {
    return ['content', 'likes'];
}
}

export default new PostController();
