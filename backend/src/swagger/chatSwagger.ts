/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: Chat Management Endpoints
 */

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: "641d15f1e8b1f9c6a9a2a5e9"
 *               receiverId:
 *                 type: string
 *                 example: "641d15f1e8b1f9c6a9a2a5ea"
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5eb"
 *               sender: "641d15f1e8b1f9c6a9a2a5e9"
 *               receiver: "641d15f1e8b1f9c6a9a2a5ea"
 *               content: "Hello, how are you?"
 *               timestamp: "2024-03-17T12:00:00.000Z"
 *               __v: 0
 *       404:
 *         description: User not found or empty message
 *         content:
 *           application/json:
 *             example:
 *               error: "Sender or receiver not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/chat/history/{firstUserId}/{secondUserId}:
 *   get:
 *     summary: Retrieve chat history between two users
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: firstUserId
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5e9"
 *       - in: path
 *         name: secondUserId
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5ea"
 *     responses:
 *       200:
 *         description: Successfully retrieved chat history
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5ed"
 *                 sender:
 *                   username: "john_doe"
 *                 receiver:
 *                   username: "jane_doe"
 *                 content: "Hey!"
 *                 timestamp: "2024-03-17T12:00:00.000Z"
 *               - _id: "641d15f1e8b1f9c6a9a2a5ee"
 *                 sender:
 *                   username: "jane_doe"
 *                 receiver:
 *                   username: "john_doe"
 *                 content: "Hello!"
 *                 timestamp: "2024-03-17T12:05:00.000Z"
 *       404:
 *         description: Invalid user IDs or users not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

/**
 * @swagger
 * /api/chat/chats:
 *   get:
 *     summary: Retrieve all users the current user has chatted with
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all chatted users
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5e9"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 profilePicture: "/uploads/profile_pictures/john_doe.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john_doe.jpg"
 *                 refreshTokens: []
 *               - _id: "641d15f1e8b1f9c6a9a2a5ea"
 *                 username: "jane_doe"
 *                 email: "jane@example.com"
 *                 profilePicture: "/uploads/profile_pictures/jane_doe.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/jane_doe.jpg"
 *                 refreshTokens: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */