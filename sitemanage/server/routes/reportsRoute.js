import express from 'express'

import { postReport, fetchReports} from '../controllers/reportsController.js'

const reportsRouter = express.Router()

reportsRouter.post('/postreport', postReport)
reportsRouter.get('/reports', fetchReports)

export default reportsRouter