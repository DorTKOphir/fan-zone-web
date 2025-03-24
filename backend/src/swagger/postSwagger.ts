/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Post Management Endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Allows authenticated users to create posts with optional images.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is my new post!"
 *               matchId:
 *                 type: string
 *                 example: "497410"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "60d21b4667d0d8992e610c85"
 *               content: "This is my new post!"
 *               matchId: "497410"
 *               image: "/uploads/post_images/myphoto.jpg"
 *               dateCreated: "2025-03-23T12:00:00.000Z"
 *               author:
 *                 _id: "641d134fe8b1f9c6a9a2a123"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 profilePicture: "/uploads/profile_pictures/john.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john.jpg"
 *               comments: []
 *       400:
 *         description: Content or image is required
 *         content:
 *           application/json:
 *             example:
 *               error: "Content or image is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error creating post"
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
 *               image: "/uploads/post_images/example.jpg"
 *               author:
 *                 _id: "641d134fe8b1f9c6a9a2a123"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 profilePicture: "/uploads/profile_pictures/john.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john.jpg"
 *               comments:
 *                 - _id: "641d164de8b1f9c6a9a2a7e8"
 *                   content: "Great post!"
 *                   dateCreated: "2025-03-14T10:16:00.000Z"
 *                   author:
 *                     _id: "641d123fe8b1f9c6a9a1a111"
 *                     username: "jane_doe"
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
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated post content."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional new image file
 *               imageDeleted:
 *                 type: string
 *                 example: "true"
 *                 description: Set to "true" to delete the existing image
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5e9"
 *               content: "Updated post content."
 *               likes: [USER_ID]
 *               image: "/uploads/post_images/updated.jpg"
 *               matchId: "497410"
 *               dateCreated: "2025-03-14T10:15:30.000Z"
 *               author:
 *                 _id: "641d134fe8b1f9c6a9a2a123"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 profilePicture: "/uploads/profile_pictures/john.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john.jpg"
 *               comments: []
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
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     summary: Get posts by match ID
 *     tags:
 *       - Posts
 *     description: Retrieves all posts associated with a specific match ID, including author and comments.
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *         example: "497410"
 *     responses:
 *       200:
 *         description: Successfully retrieved posts for the given match ID
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5e9"
 *                 matchId: "497410"
 *                 content: "What a great match!"
 *                 image: "/uploads/post_images/match.jpg"
 *                 dateCreated: "2025-03-14T10:15:30.000Z"
 *                 author:
 *                   _id: "641d134fe8b1f9c6a9a2a123"
 *                   username: "john_doe"
 *                   email: "john@example.com"
 *                   profilePicture: "/uploads/profile_pictures/john.jpg"
 *                   fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john.jpg"
 *                 comments:
 *                   - _id: "641d164de8b1f9c6a9a2a7e8"
 *                     content: "I totally agree!"
 *                     dateCreated: "2025-03-14T10:16:00.000Z"
 *                     author:
 *                       _id: "641d123fe8b1f9c6a9a1a111"
 *                       username: "jane_smith"
 *       400:
 *         description: Missing match ID in request
 *         content:
 *           application/json:
 *             example:
 *               message: "Match ID is required."
 *       500:
 *         description: Error fetching posts
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching posts by matchId"
 */

/**
 * @swagger
 * /api/posts/author/{authorId}:
 *   get:
 *     summary: Get posts by author ID
 *     tags:
 *       - Posts
 *     description: Retrieves all posts created by a specific user, including author and comments.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         example: "641d134fe8b1f9c6a9a2a123"
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: "641d15f1e8b1f9c6a9a2a5e9"
 *                 content: "Another day, another win!"
 *                 image: "/uploads/post_images/win.jpg"
 *                 matchId: "497410"
 *                 dateCreated: "2025-03-24T14:10:00.000Z"
 *                 author:
 *                   _id: "641d134fe8b1f9c6a9a2a123"
 *                   username: "john_doe"
 *                   email: "john@example.com"
 *                   profilePicture: "/uploads/profile_pictures/john.jpg"
 *                   fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/john.jpg"
 *                 comments:
 *                   - _id: "641d164de8b1f9c6a9a2a7e8"
 *                     content: "Congrats!"
 *                     dateCreated: "2025-03-24T14:20:00.000Z"
 *                     author:
 *                       _id: "641d123fe8b1f9c6a9a1a111"
 *                       username: "jane_smith"
 *       400:
 *         description: Missing author ID
 *         content:
 *           application/json:
 *             example:
 *               message: "Author ID is required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */

/**
 * @swagger
 * /api/posts/suggestion:
 *   post:
 *     summary: Generate a post suggestion from match details
 *     tags:
 *       - Posts
 *     description: Uses AI to generate a post suggestion based on match details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match:
 *                 type: object
 *                 properties:
 *                   teamA:
 *                     type: string
 *                     example: "Arsenal"
 *                   teamB:
 *                     type: string
 *                     example: "Liverpool"
 *                   scoreA:
 *                     type: number
 *                     example: 3
 *                   scoreB:
 *                     type: number
 *                     example: 1
 *     responses:
 *       200:
 *         description: Suggestion generated successfully
 *         content:
 *           application/json:
 *             example:
 *               suggestion: "What a performance by Arsenal! A dominant 3-1 win over Liverpool."
 *       400:
 *         description: Match details are required
 *         content:
 *           application/json:
 *             example:
 *               error: "Match is required"
 *       500:
 *         description: Failed to generate suggestion
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to generate suggestion"
 */

/**
 * @swagger
 * /api/posts/like/{id}:
 *   patch:
 *     summary: Update post likes by ID
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
 *               likes:
 *                 type: number
 *                 example: [USER_ID]
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "641d15f1e8b1f9c6a9a2a5e9"
 *               content: "Updated post content."
 *               likes: [USER_ID]
 *               author:
 *                 _id: "641d134fe8b1f9c6a9a2a123"
 *                 username: "john_doe"
 *       500:
 *         description: Error updating likes
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating likes"
 */
