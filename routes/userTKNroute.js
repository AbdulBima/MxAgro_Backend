const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 

const JWT_KEY = process.env.JWT_KEY;

// Use cookie-parser middleware
router.use(cookieParser());

router.get("/verifyToken", (req, res) => {
	const nkt = req.headers.authorization;

	// Check if token is provided
	if (!nkt) {
		return res
			.status(400)
			.json({ error: "Token not provided" });
	}

	try {
		// Verify the token
		const decoded = jwt.verify(nkt, JWT_KEY);

		// If verification successful, respond with decoded user ID and email
		res.json({
			userId: decoded.userId,
			userContact: decoded.userContact,
      userEmail: decoded.userEmail,
		});
	} catch (error) {
		// If verification fails, respond with valid: false
		res.status(401).json({ error: "Invalid token" });
	}
});

module.exports = router;
