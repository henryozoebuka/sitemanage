import express from 'express'
import { addMaterial, materials } from '../controllers/materialsController.js'

const materialsRouter = express.Router()

materialsRouter.post('/addmaterial', addMaterial)
materialsRouter.get('/materials', materials)

export default materialsRouter