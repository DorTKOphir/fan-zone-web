import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
	/**
	 * Get authenticated user details
	 */
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

	/**
	 * Update authenticated user details (Only username and email)
	 */
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
