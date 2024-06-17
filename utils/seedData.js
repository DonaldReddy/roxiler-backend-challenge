import axios from 'axios'
import Product from '../schema/Product.schema.js'

export default async function seedData() {
    try {

        const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")

        const products = response.data

        products.forEach(element => {
            (async function () {
                const product = await Product.findOne({ productId: element.id })
                if (!product)
                    await Product.insertMany({ productId: element.id, title: element.title, price: element.price, description: element.description, category: element.category, image: element.image, sold: element.sold, dateOfSale: element.dateOfSale });
            })()
        });

    } catch (error) {
        console.log(error.message);
    }
}