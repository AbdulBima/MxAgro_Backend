const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

// Create a User
const createUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, contact, address, password } =
			req.body;

		const existingUser = await User.findOne({
			email,
		});

		if (existingUser) {
			return res.status(400).json({
				error: "Email is already registered",
			});
		}

		const hashedPassword = await bcrypt.hash(
			password,
			10
		);
		const user = new User({
			name,
			email,
			contact,
			address,
			password: hashedPassword,
		});
		await user.save();
		res.status(201).json({
			message: "User registered successfully",
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
	try {
			const { email, password } = req.body;

			// Check if email and password are provided
			if (!email || !password) {
					return res.status(400).json({ error: "Email and password are required" });
			}


			// Find user by email
			const user = await User.findOne({ email });

			// Check if user exists and password is defined
			if (!user) {
					console.log("User not found for email:", email);
					return res.status(401).json({ message: "Invalid email or password" });
			}

			if (!user.password) {
					console.log("User password is undefined for email:", email);
					return res.status(401).json({ message: "Invalid email or password" });
			}

			// Compare passwords
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
					console.log("Password mismatch for email:", email);
					return res.status(401).json({ message: "Invalid email or password" });
			}

			// Generate JWT token
			const token = jwt.sign({ userId: user._id, userContact: user.contact, userEmail: user.email }, JWT_KEY, { expiresIn: "1h" });

			res.json({ token });
	} catch (error) {
			console.error("Error logging in:", error);
			res.status(500).json({ error: "Internal Server Error" });
	}
});


// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Get User by id
const getUserById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).select('-__v -password'); // Excluding __v and password
		res.status(200).json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

// Get User by id and update
const getUserByIdAndUpdate = asyncHandler(
	async (req, res) => {
		try {
			const { oldContact, newContact, userId } =
				req.body;
			const user = await User.findById(userId);

			if (oldContact != user.contact) {
				return res
					.status(401)
					.json({
						message: "Invalid old contactt",
					});
			}
			user.contact = newContact;
			res.status(200).json(user);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				error: "Internal Server Error",
			});
		}
	}
);

// Change user password
const updateUserPassword = asyncHandler(
	async (req, res) => {
		try {
			const { oldPassword, newPassword, userId } =
				req.body;
			const user = await User.findById(userId);
			if (
				!user ||
				!(await bcrypt.compare(
					oldPassword,
					user.password
				))
			) {
				return res
					.status(401)
					.json({
						message: "Invalid old password",
					});
			}
			user.password = await bcrypt.hash(
				newPassword,
				10
			);
			await user.save();
			res.status(200).json({
				message: "Password changed successfully",
			});
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
);

// Update Employee Admin Status
// const updateEmployeeAdminStatus = asyncHandler(
// 	async (req, res) => {
// 		const { changeeId, changerId } = req.params;

// 		try {
// 			// Find the changer employee by ID
// 			const changer = await Employee.findById(
// 				changerId
// 			);

// 			// If changer is not found or is not an admin, return 403 Forbidden
// 			if (!changer || !changer.admin) {
// 				return res
// 					.status(403)
// 					.json({ error: "Unauthorized" });
// 			}

// 			// Find the changee employee by ID
// 			const changee = await Employee.findById(
// 				changeeId
// 			);

// 			// If changee is not found, return 404 Not Found
// 			if (!changee) {
// 				return res
// 					.status(404)
// 					.json({ error: "Employee not found" });
// 			}

// 			// Update the admin status of the changee to true
// 			changee.admin = true;

// 			// Save the updated changee
// 			const updatedChangee = await changee.save();

// 			// Respond with the updated changee
// 			res.status(200).json(updatedChangee);
// 		} catch (error) {
// 			console.error(error.message);
// 			res.status(500).json({
// 				error: "Internal Server Error",
// 			});
// 		}
// 	}
// );

module.exports = {
	createUser,
	loginUser,
	getAllUsers,
	getUserById,
	getUserByIdAndUpdate,
	updateUserPassword,
};
