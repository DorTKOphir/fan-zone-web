import { Request, Response } from 'express';
import { fetchMatchById, fetchMatches } from '../services/matchService';

class MatchController {
	async getAll(req: Request, res: Response) {
		try {
			const matches = await fetchMatches();
			res.status(200).json(matches);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const match = await fetchMatchById(req.params.id);
			res.status(200).json(match);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}

export default new MatchController();
