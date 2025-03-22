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
			return res.json(users);
		} catch (error) {
			console.error('Error searching for users', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await userModel
				.findById((req as any).user._id)
				.select('-password -refreshTokens');

			if (!user) {
				console.error('User not found');
				return res.status(404).json({ error: 'User not found' });
			}

			console.log('User returned successfully');
			res.status(200).json(user);
		} catch (error) {
			console.error('Error fetching user:', error);
			res.status(500).json({ error: 'Error fetching user' });
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const updateBody: { [key: string]: any } = {};

			for (const field of this.getUpdateFields()) {
				if (req.body[field] !== undefined) {
					updateBody[field] = req.body[field];
				}
			}

			if (Object.keys(updateBody).length === 0) {
				console.error('No valid fields provided for update');
				return res.status(400).json({ error: 'No valid fields provided for update' });
			}

			const updatedUser = await userModel.findByIdAndUpdate(
				(req as any).user._id,
				updateBody,
				{ new: true, runValidators: true, select: '-password -refreshTokens' },
			);

			if (!updatedUser) {
				console.error('User not found');
				return res.status(404).json({ error: 'User not found' });
			}

			console.log('User updated successfully');
			res.status(200).json(updatedUser);
		} catch (error) {
			console.error('Error updating user:', error);
			res.status(500).json({ error: 'Error updating user' });
		}
	}

	protected getUpdateFields(): string[] {
		return ['username', 'email'];
	}
}

export default new UserController();
