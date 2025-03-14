import mongoose from "mongoose";

export interface IComment {
  content: string;
  author: mongoose.Types.ObjectId;
  dateCreated: Date;
  _id?: string;
}

const commentSchema = new mongoose.Schema<IComment>({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
});

const commentModel = mongoose.model<IComment>("Comments", commentSchema);

export default commentModel;
