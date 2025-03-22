import api from './api';

export const uploadProfilePicture = async (file: File) => {
	const formData = new FormData();
	formData.append('profilePicture', file);

	try {
		const response = await api.post(
			'users/upload-profile-picture',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		console.log('Profile picture uploaded:', response.data);
	} catch (error) {
		console.error('Error uploading profile picture:', error);
	}
};
