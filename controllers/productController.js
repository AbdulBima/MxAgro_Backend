const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({}).populate('productVendor', 'name location');
		res.status(200).json(products);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).populate('productVendor', 'name location');
		if (!product) {
			return res.status(404).json({ message: `Product with ID ${id} not found` });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Get products by vendor
const getProductByVendor = asyncHandler(async (req, res) => {
	try {
		const { vendorId } = req.params;
		const products = await Product.find({ productVendor: vendorId }).populate('productVendor', 'name location');
		res.status(200).json(products);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Create a product
const createProduct = asyncHandler(async (req, res) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).populate('productVendor', 'name location');
		if (!product) {
			return res.status(404).json({ message: `Product with ID ${id} not found` });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return res.status(404).json({ message: `Product with ID ${id} not found` });
		}
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	getAllProducts,
	getProductById,
	getProductByVendor,
	createProduct,
	updateProduct,
	deleteProduct,
};
