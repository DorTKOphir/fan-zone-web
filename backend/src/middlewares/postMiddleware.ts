import { Request, Response, NextFunction } from "express";
import postModel from "../models/postModel";

const postMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await postModel.findById(req.params.id);
    
    if (!post) {
      res.status(404).json({ error: "Post does not exist"});
      return;
    }

    if (String(post.author) !== String((req as any).user._id)) {
      res.status(403).json({ error: 'Unauthorized: You are not the author of this post' });
      return;
    }
  
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error checking post ownership' });
  }
};

export default postMiddleware;
