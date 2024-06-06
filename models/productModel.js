const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productVendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
   productLocation: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0
    },
    productQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    productQuantityPurchased: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    productImage: {
        type: String,
        required: true,
        trim: true
    },
    productCategory: {
        type: String,
        required: true,
        enum: ['cereals', 'vegetables', 'tubers']
    },
    totalProductPurchasedAmount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
