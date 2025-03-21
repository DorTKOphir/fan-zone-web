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
 *               messageId: "641d15f1e8b1f9c6a9a2a5eb"
 *               senderId: "641d15f1e8b1f9c6a9a2a5e9"
 *               receiverId: "641d15f1e8b1f9c6a9a2a5ea"
 *               content: "Hello, how are you?"
 *               timestamp: "2024-03-17T12:00:00Z"
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/history/{user1}/{user2}:
 *   get:
 *     summary: Retrieve chat history between two users
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user1
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5e9"
 *       - in: path
 *         name: user2
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
 *               messages:
 *                 - senderId: "641d15f1e8b1f9c6a9a2a5e9"
 *                   receiverId: "641d15f1e8b1f9c6a9a2a5ea"
 *                   content: "Hey!"
 *                   timestamp: "2024-03-17T12:00:00Z"
 *                 - senderId: "641d15f1e8b1f9c6a9a2a5ea"
 *                   receiverId: "641d15f1e8b1f9c6a9a2a5e9"
 *                   content: "Hello!"
 *                   timestamp: "2024-03-17T12:05:00Z"
 *       400:
 *         description: Bad request (invalid user IDs)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat/chats:
 *   get:
 *     summary: Retrieve all chats of a user
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users the current user has chatted with
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5e9"
 *                 username: "john_doe"
 *                 profilePicture: "john_doe-profile.img"
 *               - _id: "641d15f1e8b1f9c6a9a2a5ea"
 *                 username: "jane_doe"
 *                 profilePicture: "jane_doe-profile.img"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
