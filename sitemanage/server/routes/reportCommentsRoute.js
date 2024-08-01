import express from 'express'
import { postComment, fetchReportComments } from '../controllers/reportCommentsController.js'

const reportCommentsRouter = express.Router()

reportCommentsRouter.post('/postcomment', postComment)
reportCommentsRouter.get('/fetchcomments/:id', fetchReportComments)

export default reportCommentsRouter