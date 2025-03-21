import axios from 'axios';

export const uploadProfilePicture = async (file: File, token: string) => {
	const formData = new FormData();
	formData.append('profilePicture', file);

	try {
		//not using api because content type needs to be form-data
		const response = await axios.post(
			'http://localhost:5000/api/users/upload-profile-picture',
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		console.log('Profile picture uploaded:', response.data);
	} catch (error) {
		console.error('Error uploading profile picture:', error);
	}
};
