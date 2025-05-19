const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const role = require('../../middlewares/role');
const schema = require('./user.validation');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile operations
 */

router.use(auth);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 email: { type: string }
 *                 name: { type: string }
 *                 role: { type: string }
 *                 phoneNumber: { type: string }
 *       401:
 *         description: Unauthorized
 */
router.get('/me', controller.getProfile);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "081234567890"
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/me', validate(schema.updateProfile), controller.updateProfile);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete current user's account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', controller.deleteAccount);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (admin only)
 *     tags: [Users, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data found
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.get('/:id', role.isAdmin, controller.getUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get('/', role.isAdmin, controller.getAllUsers);

module.exports = router;
