import mongoose, { Schema } from 'mongoose';

export interface IUser {
	username: string;
	email: string;
	password: string;
	_id?: string;
	refreshTokens?: string[];
	profilePicture?: string;
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshTokens: {
		type: [String],
		default: [],
	},
	profilePicture: {
		type: String,
		default: '',
	},
});

userSchema.virtual('fullProfilePicture').get(function (this: IUser) {
	if (!this.profilePicture) return null;
	return `${
		this.profilePicture.startsWith('/uploads') ? process.env.BASE_URL : ''
	}${this.profilePicture}`;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const userModel = mongoose.model<IUser>('Users', userSchema);

export default userModel;
