const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = mongoose.Schema(
	{
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
      unique: true, // Ensure phone number is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    marketing_accept: {
      type: Boolean,
      default: false,
    },
  },
  
	{ timestamps: true }
);

const Vendor = mongoose.model(
	"Vendor",
	vendorSchema
);

module.exports = Vendor;
