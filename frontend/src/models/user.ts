interface User {
	_id: string;
	username: string;
	email: string;
	fullProfilePicture: string | null;
}

export type updateUserDTO = Partial<User>;
export default User;
