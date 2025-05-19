const express = require('express');
const router = express.Router();
const controller = require('./transaction.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const schema = require('./transaction.validation');
const role = require('../../middlewares/role');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction endpoints for users and admins
 */

router.use(auth);
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodItemId
 *               - quantity
 *               - pickupTime
 *             properties:
 *               foodItemId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               pickupTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Transaction created
 *       400:
 *         description: Validation error or food item not found
 */
router.post('/', validate(schema.create), controller.create);

/**
 * @swagger
 * /transactions/me:
 *   get:
 *     summary: Get transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's transactions
 */
router.get('/me', controller.getMyTransactions);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions (admin)
 *     tags: [Transactions, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transactions
 */
router.get('/', role.isAdmin, controller.getAll);

/**
 * @swagger
 * /transactions/{id}/status:
 *   patch:
 *     summary: Update status of a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Transaction status updated
 *       404:
 *         description: Transaction not found
 */
router.patch(
  '/:id/status',
  validate(schema.updateStatus),
  controller.updateStatus
);

module.exports = router;
