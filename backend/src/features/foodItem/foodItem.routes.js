const router = require('express').Router();
const controller = require('./foodItem.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const role = require('../../middlewares/role');
const schema = require('./foodItem.validation');

router.use(auth);


/**
 * @swagger
 * tags:
 *   name: FoodItems
 *   description: Food item management for partners and public access
 */

/**
 * @swagger
 * /food-items:
 *   post:
 *     summary: Create a food item (partner only)
 *     tags: [FoodItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *               - availableUntil
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               availableUntil:
 *                 type: string
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item created
 *       400:
 *         description: Validation or store not found
 */
router.post('/', validate(schema.create), role.isAdmin, controller.create);

/**
 * @swagger
 * /food-items/{id}:
 *   put:
 *     summary: Update a food item by ID (partner only)
 *     tags: [FoodItems]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               availableUntil:
 *                 type: string
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item updated
 *       404:
 *         description: Food item not found
 */
router.put('/:id', validate(schema.update), role.isAdmin, controller.update);

/**
 * @swagger
 * /food-items/{id}:
 *   delete:
 *     summary: Delete a food item by ID (partner only)
 *     tags: [FoodItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Food item deleted
 *       404:
 *         description: Food item not found
 */
router.delete('/:id', role.isAdmin, controller.remove);

/**
 * @swagger
 * /food-items:
 *   get:
 *     summary: Get all food items
 *     tags: [FoodItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of food items
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /food-items/{id}:
 *   get:
 *     summary: Get a food item by ID
 *     tags: [FoodItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Food item data
 *       404:
 *         description: Food item not found
 */
router.get('/:id', controller.getById);

module.exports = router;
