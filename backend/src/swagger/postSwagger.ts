/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Post Management Endpoints
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5e9"
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Successfully fetched the post
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5e9"
 *               content: "This is a sample post."
 *               author: { _id: "641d134fe8b1f9c6a9a2a123", username: "john_doe" }
 *               comments: [
 *                 {
 *                   _id: "641d164de8b1f9c6a9a2a7e8",
 *                   content: "Great post!",
 *                   author: { _id: "641d123fe8b1f9c6a9a1a111", username: "jane_doe" },
 *                 }
 *               ]
 *               dateCreated: "2025-03-14T10:15:30.000Z"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 *       500:
 *         description: Error fetching post
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching post"
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is a new post content."
 *  *            matchId:
 *                 type: string
 *                 example: "12305942"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5e9"
 *               author: "641d134fe8b1f9c6a9a2a123"
 *               content: "This is a new post content."
 *               comments: []
 *               dateCreated: "2025-03-14T10:15:30.000Z"
 *       400:
 *         description: Content is required
 *         content:
 *           application/json:
 *             example:
 *               error: "Content is required"
 *       500:
 *         description: Error creating post
 *         content:
 *           application/json:
 *             example:
 *               error: "Error creating post"
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5e9"
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated post content."
 *               likes:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5e9"
 *               content: "Updated post content."
 *               likes: 10
 *               author: { _id: "641d134fe8b1f9c6a9a2a123", username: "john_doe" }
 *       400:
 *         description: No valid fields provided for update
 *         content:
 *           application/json:
 *             example:
 *               error: "No valid fields provided for update"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 *       500:
 *         description: Error updating post
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating post"
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d15f1e8b1f9c6a9a2a5e9"
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Post deleted successfully"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 *       500:
 *         description: Error deleting post
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting post"
 */

 /**
 * @swagger
 * /api/posts/match/{matchId}:
 *   get:
 *     summary: Get posts by matchId
 *     tags:
 *       - Posts
 *     description: Retrieves all posts associated with a specific match ID, including author and comments.
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a123e4b5c678f9d0a1b234"
 *         description: The ID of the match to fetch posts for.
 *     responses:
 *       200:
 *         description: Successfully retrieved posts for the given match ID.
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5e9"
 *                 matchId: "65a123e4b5c678f9d0a1b234"
 *                 content: "What a great match!"
 *                 author:
 *                   _id: "641d134fe8b1f9c6a9a2a123"
 *                   username: "john_doe"
 *                 comments:
 *                   - _id: "641d164de8b1f9c6a9a2a7e8"
 *                     content: "I totally agree!"
 *                     author:
 *                       _id: "641d123fe8b1f9c6a9a1a111"
 *                       username: "jane_smith"
 *       400:
 *         description: Missing match ID in request.
 *         content:
 *           application/json:
 *             example:
 *               message: "Match ID is required."
 *       404:
 *         description: No posts found for the given match ID.
 *         content:
 *           application/json:
 *             example:
 *               message: "No posts found for this match ID."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Server error."
 */
