import { Request, Response } from 'express';
import { fetchMatches } from '../services/matchService';

class MatchController {
	async getAll(req: Request, res: Response) {
		try {
			const matches = await fetchMatches();
			res.status(200).json(matches);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}

export default new MatchController();
