import User from "./user";

interface Comment {
	_id: string;
	content: string;
	author: User;
	dateCreated: string;
}
