import { Comment } from './comment';
import User from './user';

export type Post = {
	author: User;
	content: string;
	dateCreated: string;
	comments: Comment[];
};
