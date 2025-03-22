import User from './user';

export type Comment = {
	_id: string;
	author: User;
	content: string;
	dateCreated: string;
};
