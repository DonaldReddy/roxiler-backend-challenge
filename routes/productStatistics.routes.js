import express from 'express'
import { getAllStats, getStatistics, getPieChart, getBarChart } from '../controllers/productsStatistics.controllers.js'

const router = express.Router();

router.get("/statistics/sales", getStatistics)
router.get("/statistics/bar-chart", getBarChart)
router.get("/statistics/pie-chart", getPieChart)
router.get("/statistics/all-stats", getAllStats)

export default router