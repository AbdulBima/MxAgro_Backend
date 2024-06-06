const {  createVendor,
	loginVendor,
	getAllVendors,
	getVendorById,
	getVendorByIdAndUpdate,
	updateVendorPassword,
	
} = require("../controllers/vendorController");
const Vendor = require("../models/vendorModel");
const express = require("express");

const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Use cookie-parser middleware
router.use(cookieParser());


router.post('/register', createVendor);
router.post('/login', loginVendor);
router.get('/vendorId/:id', getVendorById);
router.get('/all', getAllVendors);
router.put('/update', getVendorByIdAndUpdate);





module.exports = router;

