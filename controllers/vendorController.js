const Vendor = require('../models/vendorModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

// Create a vendor
const createVendor = asyncHandler( async (req, res) => {
	try {
		const { first_name, last_name,  contact, email, password, marketing_accept } = req.body;

		const existingVendor = await Vendor.findOne({
			email,
		});

		if (existingVendor) {
			return res
				.status(400)
				.json({
					error: "Email is already registered",
				});
		}

			
			const hashedPassword = await bcrypt.hash(password, 10);
			const vendor = new Vendor({  first_name, last_name, contact, email, password: hashedPassword,  marketing_accept});
			await vendor.save();
			res.status(201).json({ message: 'Vendor registered successfully' });
	} catch (error) {
			res.status(400).json({ error: error.message });
	}
});

// Login vendor
const loginVendor = asyncHandler(async (req, res) => {
	try {
			const { email, password } = req.body;
			const vendor = await Vendor.findOne({ email });
			if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
					return res.status(401).json({ message: 'Invalid email or password' });
			}
			const token = jwt.sign({ vendorId: vendor._id, vendorEmail: vendor.email, vendorContact: vendor.contact }, JWT_KEY, { expiresIn: '1h' });
			res.json({ token });
	} catch (error) {
			res.status(400).json({ error: error.message });
	}
});


// Get all vendors
const getAllVendors = asyncHandler(async (req, res) => {
	try {
		const vendors = await Vendor.find({});
		res.status(200).json(vendors);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Get vendor by id
const getVendorById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const vendor = await Vendor.findById(id);
		res.status(200).json(vendor); 
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});


// find vendor by id and update
const getVendorByIdAndUpdate = asyncHandler(async (req, res) => {
	try {
	
		const { oldContact , newContact, userId } = req.body;
		const vendor = await Vendor.findById(userId);

		if (oldContact != vendor.contact ) {
			return res.status(401).json({ message: 'Invalid vendor old contact' });
	}
		vendor.contact = newContact;
		res.status(200).json(vendor); 
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});


// Change vendor password
const updateVendorPassword = asyncHandler(async (req, res) => {
	try {
		
			const { oldPassword, newPassword, vendorId } = req.body;
			const vendor = await vendor.findById(vendorId);
			if (!vendor || !(await bcrypt.compare(oldPassword, user.password))) {
					return res.status(401).json({ message: 'Invalid old password or vendor Id' });
			}
			vendor.password = await bcrypt.hash(newPassword, 10);
			await vendor.save();
			res.status(200).json({ message: 'Password changed successfully' });
	} catch (error) {
			res.status(400).json({ error: error.message });
	}
});



module.exports = {
	createVendor,
	loginVendor,
	getAllVendors,
	getVendorById,
	getVendorByIdAndUpdate,
	updateVendorPassword,
};
