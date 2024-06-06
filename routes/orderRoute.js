const {
  getAllOrders,
	getOrderById,
  createOrder,
	getProductsByVendorFromOrders,
	getOrdersByBuyerId,
	
} = require("../controllers/orderController");
const Event = require("../models/orderModel");
const express = require("express");

const router = express.Router();


router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/orders/:buyerId", getOrdersByBuyerId);
router.post("/", createOrder);
router.get("/vendor/:vendorId", getProductsByVendorFromOrders);




module.exports = router;
