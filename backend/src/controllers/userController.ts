import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
    async searchUsers(req: Request, res: Response) {
        try {
            const usernameQuery = req.query.usernameQuery as string;
            if (!usernameQuery) {
                console.error('Query is required');
                return res.status(400).json({ error: 'Query is required'});
            }

            const users = await userModel.find({ username: new RegExp(usernameQuery, "i") })
            .select("_id username")
            .limit(10);

            console.log(`Users queried successfully by query: ${usernameQuery}`);
            return res.json(users);
        } catch(error) {
            console.error("Error searching for users", error);
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}

export default new UserController();
