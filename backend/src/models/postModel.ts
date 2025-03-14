import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  dateCreated: Date;
  content: string;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    dateCreated: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true },
  }
);

const postModel = mongoose.model<IPost>('Post', postSchema);

export default postModel;
