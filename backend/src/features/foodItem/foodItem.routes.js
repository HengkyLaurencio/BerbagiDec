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
 * /food:
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
 *               sold:
 *                  type: integer
 *               quantity:
 *                 type: integer
 *               price:
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
router.post('/', validate(schema.create), role.isPartner, controller.create);

/**
 * @swagger
 * /food/me:
 *   get:
 *     summary: Get all food items by store
 *     tags: [FoodItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of food items
 */
router.get('/me', validate(schema.create), role.isPartner, controller.getAllFoodByStore);

/**
 * @swagger
 * /food/{id}:
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
 *               sold:
 *                  type: integer
 *               quantity:
 *                 type: integer
 *               price:
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
router.put('/:id', validate(schema.update), role.isPartner, controller.update);

/**
 * @swagger
 * /food/{id}:
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
router.delete('/:id', role.isPartner    , controller.remove);

/**
 * @swagger
 * /food:
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
 * /food/{id}:
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
