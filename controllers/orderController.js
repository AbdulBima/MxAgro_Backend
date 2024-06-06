const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");



//create a order

const createOrder = asyncHandler(async (req, res) => {
	try {
		const order = await Order.create(
			req.body
		);
		res.status(200).json(order);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});


//get all orders
const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({});

		res.status(200).json(orders);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//get order by id

const getOrderById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id);

		res.status(200).json(order);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const getOrdersByBuyerId = asyncHandler(async (req, res) => {
  const { buyerId } = req.params;

  try {
    const orders = await Order.find({ buyerId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found for this user' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const getProductsByVendorFromOrders = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  try {
    // Aggregate to unwind the order array, match products by productVendor, and group them back into the original order format
    const matchedProducts = await Order.aggregate([
      { $unwind: "$order" }, // Unwind the order array
      { $match: { "order.productVendor": vendorId } }, // Match products by productVendor
      { 
        $group: {
          _id: "$_id",
          buyerId: { $first: "$buyerId" },
          buyerEmail: { $first: "$buyerEmail" },
          buyerContact: { $first: "$buyerContact" },
          buyerAddress: { $first: "$buyerAddress" },
          buyerCity: { $first: "$buyerCity" },
          buyerState: { $first: "$buyerState" },
          orderAmount: { $first: "$orderAmount" },
          order: { $push: "$order" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" }
        }
      }
    ]);

    res.status(200).json(matchedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






module.exports = {
	
  getAllOrders,
	getOrderById,
  createOrder,
	getProductsByVendorFromOrders,
	getOrdersByBuyerId,
	// deleteProduct,
};
