import { Request, Response } from "express";
import commentModel from "../models/commentModel";
import postModel from "../models/postModel";

class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const postId = req.params.postId;
      const userId = (req as any).user._id;

      if (!content || !postId) {
        return res.status(400).json({ error: "Content and postId are required" });
      }

      const newComment = new commentModel({
        content,
        author: userId,
        dateCreated: new Date(),
      });

      await newComment.save();

      await postModel.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Error creating comment" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const updatedComment = await commentModel.findByIdAndUpdate(
        req.params.commentId,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: "Error updating comment" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const commentId = req.params.commentId;
      const comment = await commentModel.findById(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      await commentModel.findByIdAndDelete(commentId);

      await postModel.updateOne({ comments: commentId }, { $pull: { comments: commentId } });

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting comment" });
    }
  }
}

export default new CommentController();
