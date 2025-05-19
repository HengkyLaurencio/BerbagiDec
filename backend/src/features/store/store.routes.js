const router = require('express').Router();
const controller = require('./store.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const schema = require('./store.validation');
const role = require('../../middlewares/role');

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management and access
 */

router.use(auth);

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a store for the current user
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               storeAddress:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               openTime:
 *                 type: string
 *                 example: "08:00"
 *               closeTime:
 *                 type: string
 *                 example: "17:00"
 *     responses:
 *       200:
 *         description: Store created successfully
 *       400:
 *         description: Validation error or already has a store
 */
router.post('/', validate(schema.createStore), controller.createStore);

/**
 * @swagger
 * /stores/me:
 *   get:
 *     summary: Get current user's store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Store data retrieved
 *       404:
 *         description: Store not found
 */
router.get('/me', controller.getMyStore);

/**
 * @swagger
 * /stores/me:
 *   put:
 *     summary: Update current user's store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               storeAddress:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               openTime:
 *                 type: string
 *               closeTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store updated
 *       404:
 *         description: Store not found
 */
router.put('/me', validate(schema.updateStore), controller.updateStore);

/**
 * @swagger
 * /stores/me:
 *   delete:
 *     summary: Delete current user's store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Store deleted
 *       404:
 *         description: Store not found
 */
router.delete('/me', controller.deleteStore);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores (admin only)
 *     tags: [Stores, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all stores
 *       403:
 *         description: Forbidden
 */
router.get('/', role.isAdmin, controller.getAllStores);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get store by ID (admin only)
 *     tags: [Stores, Admin]
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
 *         description: Store data retrieved
 *       404:
 *         description: Store not found
 *       403:
 *         description: Forbidden
 */
router.get('/:id', role.isAdmin, controller.getStoreById);

module.exports = router;
