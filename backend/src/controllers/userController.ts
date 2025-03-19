import { Request, Response } from 'express';
import userModel from '../models/userModel';
import mongoose from 'mongoose';

class UserController {
	async getById(req: Request, res: Response) {
		try {
			const { userId } = req.params;

			if (!mongoose.Types.ObjectId.isValid(userId)) {
				console.error('Invalid user ID');
				return res.status(400).json({ error: 'Invalid user ID' });
			}

			const user = await userModel.findById(userId).select('-password -refreshTokens');

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

	async update(req: Request, res: Response) {
		try {
			const { userId } = req.params;
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

			if (!mongoose.Types.ObjectId.isValid(userId)) {
				console.error('Invalid user ID');
				return res.status(400).json({ error: 'Invalid user ID' });
			}

			const updatedUser = await userModel.findByIdAndUpdate(userId, updateBody, {
				new: true,
				runValidators: true,
				select: '-password -refreshTokens',
			});

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
