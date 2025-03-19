import { Comment } from './comment';
import User from './user';

export type Post = {
	id: string;
	author: User;
	content: string;
	dateCreated: string;
	comments: Comment[];
};

export interface IPost {
	_id: string;
	author: User;
	content: string;
	dateCreated: string;
	comments: Comment[];
	matchId: string;
	likes: string[];
}
