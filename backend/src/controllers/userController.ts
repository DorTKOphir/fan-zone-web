import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
	async uploadProfilePicture(req: Request, res: Response) {
		try {
			const file = (req as any).file;
			const userId = (req as any).user._id;

			if (!file) {
				return res.status(400).json({ message: 'No file uploaded' });
			}

			const user = await userModel.findById(userId);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			user.profilePicture = `/uploads/profile_pictures/${file.filename}`;
			await user.save();

			res.status(200).json({
				message: 'Profile picture updated',
				profilePicture: user.profilePicture,
			});
		} catch (error) {
			res.status(500).json({ message: 'Internal server error', error: error.message });
		}
	}

	async searchUsers(req: Request, res: Response) {
		try {
			const usernameQuery = req.query.usernameQuery as string;
			if (!usernameQuery) {
				console.error('Query is required');
				return res.status(400).json({ error: 'Query is required' });
			}

			const users = await userModel
				.find({ username: new RegExp(usernameQuery, 'i') })
				.select('_id username profilePicture')
				.limit(10);

			console.log(`Users queried successfully by query: ${usernameQuery}`);

			const userFiles = users.map((user) => ({
				username: user.username,
				file: user.profilePicture ? `${process.env.BASE_URL}${user.profilePicture}` : null,
			}));

			return res.json(userFiles);
		} catch (error) {
			console.error('Error searching for users', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}

export default new UserController();
