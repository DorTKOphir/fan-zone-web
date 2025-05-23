import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
	author: mongoose.Types.ObjectId;
	dateCreated: Date;
	content: string;
	matchId: string;
	comments: mongoose.Types.ObjectId[];
	likes: string[];
	image?: string;
}

const postSchema = new Schema<IPost>({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
	dateCreated: { type: Date, required: true, default: Date.now },
	matchId: { type: String, required: true },
	content: { type: String, required: true },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments', default: [] }],
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: [] }],
	image: { type: String },
});

postSchema.set('toJSON', {
	transform: (_, ret) => {
		if (ret.image) {
			ret.image = `${process.env.BASE_URL}${ret.image}`;
		}
		return ret;
	},
});

postSchema.set('toObject', {
	transform: (_, ret) => {
		if (ret.image) {
			ret.image = `${process.env.BASE_URL}${ret.image}`;
		}
		return ret;
	},
});

const postModel = mongoose.model<IPost>('Post', postSchema);

export default postModel;
