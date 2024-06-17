import Product from '../schema/Product.schema.js'

const months = {
    'january': '01',
    'february': '02',
    'march': '03',
    'april': '04',
    'may': '05',
    'june': '06',
    'july': '07',
    'august': '08',
    'september': '09',
    'october': '10',
    'november': '11',
    'december': '12'
};

async function getStatistics(req, res, isReturn = false) {
    try {
        const { month = 'january' } = req.query

        const monthNumber = months[month];

        const totalProducts = await Product.find({ saleMonth: monthNumber });

        const totalSale = totalProducts.reduce((total, product) => (
            total + product.price
        ), 0)

        const totalSoldItems = totalProducts.filter((product) => (
            product.sold == true
        ))

        const totalNotSoldItems = totalProducts.filter((product) => (
            product.sold == false
        ))

        const result = { TotalSale: parseFloat(totalSale.toFixed(2)), TotalSoldItems: totalSoldItems.length, TotalNotSoldItems: totalNotSoldItems.length }
        if (isReturn == true)
            return result
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}

async function getBarChart(req, res, isReturn = false) {
    try {
        const { month = 'january' } = req.query

        const monthNumber = months[month];

        const totalProducts = await Product.find({ saleMonth: monthNumber });

        const ranges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        totalProducts.forEach((product) => {
            const price = product.price;

            if (price <= 100) {
                ranges['0-100'] += 1;
            } else if (price <= 200) {
                ranges['101-200'] += 1;
            } else if (price <= 300) {
                ranges['201-300'] += 1;
            } else if (price <= 400) {
                ranges['301-400'] += 1;
            } else if (price <= 500) {
                ranges['401-500'] += 1;
            } else if (price <= 600) {
                ranges['501-600'] += 1;
            } else if (price <= 700) {
                ranges['601-700'] += 1;
            } else if (price <= 800) {
                ranges['701-800'] += 1;
            } else if (price <= 900) {
                ranges['801-900'] += 1;
            } else {
                ranges['901-above'] += 1;
            }
        })
        if (isReturn == true)
            return ranges
        res.send(ranges)


    } catch (error) {

    }
}

async function getPieChart(req, res, isReturn = false) {
    try {
        const { month = 'january' } = req.query

        const monthNumber = months[month];

        const totalProducts = await Product.find({ saleMonth: monthNumber });

        const categories = {}

        totalProducts.forEach((product) => {
            if (product.category in categories)
                categories[product.category] += 1
            categories[product.category] = 1
        })

        if (isReturn == true)
            return categories

        res.send(categories)

    } catch (error) {
        console.log(error);
    }
}

async function getAllStats(req, res) {
    try {
        const statistics = await getStatistics(req, res, true)
        const pieChart = await getPieChart(req, res, true)
        const barChart = await getBarChart(req, res, true)
        res.send({ statistics: statistics, pieChart: pieChart, barChart: barChart });
    } catch (error) {

    }
}

export { getStatistics, getBarChart, getPieChart, getAllStats }