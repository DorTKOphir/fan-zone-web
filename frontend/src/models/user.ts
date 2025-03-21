interface User {
	_id: string;
	username: string;
	email: string;
	profilePicture: string | null;
}

export type updateUserDTO = Partial<User>;
export default User;
