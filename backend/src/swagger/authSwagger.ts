/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication Endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token_here"
 *               refreshToken: "your_refresh_token_here"
 *               user:
 *                 _id: "user_id_here"
 *                 username: "johndoe"
 *                 email: "johndoe@example.com"
 *                 profilePicture: "/uploads/profile_pictures/default.png"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/default.png"
 *                 refreshTokens: []
 *       500:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Registration failed"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token_here"
 *               refreshToken: "your_refresh_token_here"
 *               user:
 *                 _id: "user_id_here"
 *                 username: "johndoe"
 *                 email: "johndoe@example.com"
 *                 profilePicture: "/uploads/profile_pictures/default.png"
 *                 fullProfilePicture: "https://yourdomain.com/uploads/profile_pictures/default.png"
 *                 refreshTokens: []
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid credentials"
 *       500:
 *         description: Login failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Login failed"
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token_here
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Logout successful"
 *       403:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid refresh token"
 *       500:
 *         description: Logout failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Logout failed"
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token_here
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_new_access_token_here"
 *       403:
 *         description: Token error
 *         content:
 *           application/json:
 *             examples:
 *               missing:
 *                 summary: Missing refresh token
 *                 value:
 *                   error: "Refresh token required"
 *               invalid:
 *                 summary: Invalid JWT
 *                 value:
 *                   error: "Invalid refresh token"
 *               mismatch:
 *                 summary: Token does not match user
 *                 value:
 *                   error: "Token does not match"
 *       500:
 *         description: Token refresh failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Token refresh failed"
 */
