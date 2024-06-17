import express from 'express'
import cors from 'cors'
import productTransaction from './routes/productsTransactions.routes.js'
import productStatistics from './routes/productStatistics.routes.js'

const app = express()

app.use(cors())

app.use(productTransaction)
app.use(productStatistics)

export default app;
