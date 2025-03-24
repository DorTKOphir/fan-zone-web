/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /api/users/upload-profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     description: Uploads a profile picture for the authenticated user.
 *     tags:
 *       - Users
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
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile picture updated"
 *               profilePicture: "/uploads/profile_pictures/abc123.jpg"
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             example:
 *               message: "No file uploaded"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *               error: "Detailed error message"
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get current user details
 *     description: Returns the authenticated user's public profile information.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "60d21b4667d0d8992e610c85"
 *               username: "johndoe"
 *               email: "johndoe@example.com"
 *               profilePicture: "/uploads/profile_pictures/johndoe.jpg"
 *               fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/johndoe.jpg"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching user"
 */

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update current user's profile
 *     description: Allows the authenticated user to update their username or email.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newusername"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "60d21b4667d0d8992e610c85"
 *               username: "newusername"
 *               email: "newemail@example.com"
 *               profilePicture: "/uploads/profile_pictures/updated.jpg"
 *               fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/updated.jpg"
 *       400:
 *         description: No valid fields provided for update
 *         content:
 *           application/json:
 *             example:
 *               error: "No valid fields provided for update"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Error updating user
 *         content:
 *           application/json:
 *             example:
 *               error: "Error updating user"
 */

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search for users by username
 *     description: Searches for users using a partial or full username match.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: usernameQuery
 *         required: true
 *         schema:
 *           type: string
 *         example: "john"
 *         description: Partial or full username to search for
 *     responses:
 *       200:
 *         description: A list of matching users
 *         content:
 *           application/json:
 *             example:
 *               - _id: "60d21b4667d0d8992e610c85"
 *                 username: "johndoe"
 *                 email: "johndoe@example.com"
 *                 profilePicture: "/uploads/profile_pictures/johndoe.jpg"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/johndoe.jpg"
 *       400:
 *         description: Query parameter is required
 *         content:
 *           application/json:
 *             example:
 *               error: "Query is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */