/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Endpoints for managing comments
 */

/**
 * @swagger
 * /api/comments/{postId}:
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
 *             example:
 *               _id: "60d9f1b3f72e4b001c8f8d12"
 *               content: "Great match!"
 *               author: "60a7c9e9f5e2b14c8b3e8f01"
 *               dateCreated: "2024-03-20T18:30:00.000Z"
 *       400:
 *         description: Missing content or post ID
 *         content:
 *           application/json:
 *             example:
 *               error: "Content and postId are required"
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error creating comment"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
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
 *             example:
 *               _id: "60d9f1b3f72e4b001c8f8d12"
 *               content: "Updated comment text"
 *               author: "60a7c9e9f5e2b14c8b3e8f01"
 *               dateCreated: "2024-03-20T18:30:00.000Z"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Content is required"
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden (Only the author can update)
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Comment not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating comment"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
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
 *         content:
 *           application/json:
 *             example:
 *               message: "Comment deleted successfully"
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Forbidden (Only the author can delete)
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Comment not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting comment"
 */
