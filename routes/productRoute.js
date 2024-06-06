const express = require('express');
const { check, validationResult } = require('express-validator');
const {
	getAllProducts,
	getProductById,
	getProductByVendor,
	createProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Validation middleware for creating a product
const validateCreateProduct = [
	check('name').notEmpty().withMessage('Product name is required'),
	check('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
	check('vendorId').isMongoId().withMessage('Invalid vendor ID'),
	// Add more validations as needed
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	}
];

// Validation middleware for updating a product
const validateUpdateProduct = [
	check('name').optional().notEmpty().withMessage('Product name cannot be empty'),
	check('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
	// Add more validations as needed
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	}
];

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/vendor/:vendorId', getProductByVendor);
router.post('/create', validateCreateProduct, createProduct);
router.put('/update/:id', validateUpdateProduct, updateProduct);
router.delete('/del/:id', deleteProduct);

module.exports = router;
