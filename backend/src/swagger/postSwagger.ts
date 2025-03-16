/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - author
 *         - content
 *         - dateCreated
 *       properties:
 *         id:
 *           type: string
 *           example: "60d5f9e75a6b6c0015cfa2b3"
 *         author:
 *           type: string
 *           example: "60d5f9e75a6b6c0015cfa2b2"
 *         content:
 *           type: string
 *           example: "This is a sample post content"
 *         dateCreated:
 *           type: string
 *           format: date-time
 *           example: "2025-03-11T12:00:00.000Z"
 *         matchId:
 *           type: string
 *           example: "60d5f9e75a6b6c0015cfa2b4"
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60d5f9e75a6b6c0015cfa2b5", "60d5f9e75a6b6c0015cfa2b6"]
 *
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - author
 *         - content
 *       properties:
 *         author:
 *           type: string
 *           example: "60d5f9e75a6b6c0015cfa2b2"
 *         content:
 *           type: string
 *           example: "This is my first post!"
 *         dateCreated:
 *           type: string
 *           format: date-time
 *           example: "2025-03-11T12:00:00.000Z"
 *
 *     UpdatePostRequest:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           example: "Updated post content"
 *
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Post deleted successfully"
 *
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Fetches a post using its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *
 *   put:
 *     summary: Update a post's content
 *     description: Updates the content of a specific post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostRequest'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Content is required
 *       404:
 *         description: Post not found
 *
 *   delete:
 *     summary: Delete a post
 *     description: Removes a post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       404:
 *         description: Post not found
 *
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post with an author and content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Author and content are required
 *
 * /api/posts/match/{matchId}:
 *   get:
 *     summary: Get posts by match ID (Future Implementation)
 *     description: Retrieves posts related to a specific match. (Not yet implemented)
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       501:
 *         description: Function not implemented yet
 */
