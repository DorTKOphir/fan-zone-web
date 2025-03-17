/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Endpoints for managing comments
 */

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Create a new comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Great match!"
 *     responses:
 *       201:
 *         description: Comment successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d9f1b3f72e4b001c8f8d12"
 *                 content:
 *                   type: string
 *                   example: "Great match!"
 *                 author:
 *                   type: string
 *                   example: "60a7c9e9f5e2b14c8b3e8f01"
 *                 postId:
 *                   type: string
 *                   example: "609d1e9c3b5e4b001c8f7a1e"
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: Update an existing comment
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d9f1b3f72e4b001c8f8d12"
 *                 content:
 *                   type: string
 *                   example: "Updated comment text"
 *                 author:
 *                   type: string
 *                   example: "60a7c9e9f5e2b14c8b3e8f01"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden (Only the author can update)
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment successfully deleted
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden (Only the author can delete)
 */