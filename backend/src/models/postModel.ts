import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  dateCreated: Date;
  content: string;
  likes: string[],
}

const postSchema = new Schema<IPost>(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    dateCreated: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: [] }]
  }
);

const postModel = mongoose.model<IPost>('Post', postSchema);

export default postModel;
