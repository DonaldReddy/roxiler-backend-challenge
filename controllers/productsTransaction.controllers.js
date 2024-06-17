import Product from '../schema/Product.schema.js'

async function getTransactions(req, res) {
    try {
        const { search = '', page = 1 } = req.query

        const currentPage = parseInt(page, 10);
        const itemsPerPage = 10;

        const searchQuery = search ? {
            $or: [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ]
        } : {};

        const total = await Product.countDocuments(searchQuery)

        const result = await Product.find(searchQuery).skip((currentPage - 1) * itemsPerPage).limit(itemsPerPage)

        res.send({ prev: Math.max(currentPage - 1, 1), next: Math.min((currentPage * itemsPerPage) < total ? currentPage + 1 : currentPage), data: result })
    } catch (error) {
        console.log(error.message);
    }
}

export { getTransactions }