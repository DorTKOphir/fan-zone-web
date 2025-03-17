import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
  read: boolean;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

MessageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

export default mongoose.model<IMessage>("Message", MessageSchema);
