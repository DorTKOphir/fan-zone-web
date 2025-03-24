import User from '@/models/user';
import api from './api';

export const uploadProfilePicture = async (file: File) => {
	const formData = new FormData();
	formData.append('profilePicture', file);

	try {
		const response = await api.post('users/upload-profile-picture', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('Profile picture uploaded:', response.data);
	} catch (error) {
		console.error('Error uploading profile picture:', error);
	}
};

export const updateUser = async (user: User) => {
	try {
		const response = await api.patch('users', { ...user });
		console.log('user updated:', response.data);
	} catch (error) {
		console.error('Error updating user:', error);
	}
};

export const getUserById = async (userId: string) => {
	try {
		const response = await api.get(`users/${userId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user with id', userId, error);
	}
};
