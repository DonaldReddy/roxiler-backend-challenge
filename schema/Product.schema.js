import mongoose from "mongoose";

const schema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        default: false
    },
    dateOfSale: {
        type: String,
        required: true
    },
    saleMonth: {
        type: String,
    },
    saleDay: {
        type: String,
    },
    saleYear: {
        type: String,
    },
})

schema.pre('insertMany', (next, docs) => {
    console.log(docs);
    docs.saleYear = docs.dateOfSale.split('T')[0].split('-')[0];
    docs.saleMonth = docs.dateOfSale.split('T')[0].split('-')[1];
    docs.saleDay = docs.dateOfSale.split('T')[0].split('-')[2];
    next()
})

const Product = new mongoose.model('products', schema);

export default Product;