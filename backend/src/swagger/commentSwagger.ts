/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60a7c17b6c7d4c001f1a2a34"
 *         content:
 *           type: string
 *           example: "This is a comment."
 *         author:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "60a7c17b6c7d4c001f1a2a35"
 *             username:
 *               type: string
 *               example: "JohnDoe"
 *         dateCreated:
 *           type: string
 *           format: date-time
 *           example: "2025-03-14T12:00:00Z"
 *
 *     CreateCommentRequest:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           example: "This is a comment."
 *
 *     UpdateCommentRequest:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           example: "Updated comment content."
 *
 *     DeleteCommentResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Comment deleted successfully."
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     description: Adds a new comment to a post.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to add a comment to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentRequest'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Error creating comment
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     description: Updates the content of an existing comment (only by the author).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCommentRequest'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Unauthorized (not the comment author)
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error updating comment
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes an existing comment (only by the author).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCommentResponse'
 *       403:
 *         description: Unauthorized (not the comment author)
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */

export {};
