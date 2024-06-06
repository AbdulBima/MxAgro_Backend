const mongoose = require("mongoose");

const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const nigerianCities = [
    // This list should ideally be comprehensive, but for brevity, we'll include a few major cities
    "Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Kaduna",
    "Onitsha", "Maiduguri", "Zaria", "Aba", "Jos", "Ilorin", "Oyo", "Enugu",
    "Abeokuta", "Owerri", "Warri", "Calabar", "Uyo", "Asaba", "Sokoto", "Minna",
    "Yola", "Makurdi", "Awka", "Ado Ekiti", "Bauchi", "Katsina", "Akure",
    // Add more cities as needed
];

const productSchema = mongoose.Schema({
    _id: { type: String, required: true },
    productName: { type: String, required: true },
    productVendor: { type: String, required: true },
    productLocation: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productQuantityPurchased: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: true },
    productCategory: { type: String, required: true, enum: ["cereals", "vegetables", "tubers"] },
    totalProductPurchasedAmount: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    __v: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
    {
        buyerId: { type: String, required: true },
        buyerEmail: { type: String, required: true },
        buyerContact: { type: String, required: true },
        buyerAddress: { type: String, required: true },
        buyerCity: { type: String, required: true, enum: nigerianCities },
        buyerState: { type: String, required: true, enum: nigerianStates },
        orderAmount: { type: Number, required: true },
        order: {
            type: [productSchema], // Change the type to an array of the product schema
            default: [],
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
