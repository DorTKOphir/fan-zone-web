import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import ms from 'ms';

class AuthController {
	async register(req: Request, res: Response) {
		try {
			const { username, email, password } = req.body;
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			const newUser = new userModel({ username, email, password: hashedPassword });

			const accessToken = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRE_DURATION as ms.StringValue,
			});

			const refreshToken = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.REFRESH_EXPIRE_DURATION as ms.StringValue,
			});

			newUser.refreshTokens = [refreshToken];

			await newUser.save();

			console.log('User registered successfully');
			res.status(201).json({ accessToken, refreshToken, user: newUser });
		} catch (error) {
			console.error('Registration failed', error);
			res.status(500).json({ error: 'Registration failed' });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, email, password } = req.body;
			const user = await userModel.findOne({
				$or: [{ email: email || '' }, { username: username || '' }],
			});

			if (!user || !(await bcrypt.compare(password, user.password))) {
				console.error('Invalid credintials');
				return res.status(401).json({ error: 'Invalid credentials' });
			}

			const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRE_DURATION as ms.StringValue,
			});

			const refreshToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.REFRESH_EXPIRE_DURATION as ms.StringValue,
			});

			user.refreshTokens.push(refreshToken);
			await user.save();

			console.log('User logged in succesfully');
			res.status(200).json({ accessToken, refreshToken, user });
		} catch (error) {
			console.error('Login failed');
			res.status(500).json({ error: 'Login failed' });
		}
	}

	async logout(req: Request, res: Response) {
		try {
			const { refreshToken } = req.body;
			const user = await userModel.findOne({ refreshTokens: { $in: [refreshToken] } });

			if (!user) {
				console.error('Invalid refresh token');
				return res.status(403).json({ error: 'Invalid refresh token' });
			}

			user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
			await user.save();

			console.log('Logout succesful');
			res.status(200).json({ message: 'Logout successful' });
		} catch (error) {
			console.error('Logout failed');
			res.status(500).json({ error: 'Logout failed' });
		}
	}

	async refresh(req: Request, res: Response) {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) {
				console.error('Refresh token required');
				return res.status(403).json({ error: 'Refresh token required' });
			}

			jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, user: any) => {
				if (err) {
					console.error('Token does not match');
					return res.status(403).json({ error: 'Invalid refresh token' });
				}

				const foundUser = await userModel.findOne({
					_id: user._id,
					refreshTokens: { $in: [refreshToken] },
				});
				if (!foundUser) {
					console.error('Token does not match');
					return res.status(403).json({ error: 'Token does not match' });
				}

				const newAccessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
					expiresIn: process.env.TOKEN_EXPIRE_DURATION as ms.StringValue,
				});

				res.status(200).json({ accessToken: newAccessToken });
			});
		} catch (error) {
			console.error('Token refresh failed');
			res.status(500).json({ error: 'Token refresh failed' });
		}
	}
}

export default new AuthController();
