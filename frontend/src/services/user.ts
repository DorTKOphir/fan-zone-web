import User, { updateUserDTO } from '@/models/user';
import api from './api';

export const updateUser = async (user: updateUserDTO): Promise<User> => {
	try {
		const response = await api.patch(`/users/`, {
			user,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
