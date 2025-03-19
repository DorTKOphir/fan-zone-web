import User from './user';

export type Comment = {
	_id: string;
	author: User;
	content: string;
	dateCreated: string;
};

export type NewComment = {
	postId: string;
	content?: string;
};
