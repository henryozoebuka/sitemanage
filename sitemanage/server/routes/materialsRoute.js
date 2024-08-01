import express from 'express'
import { addMaterial, materials, removeMaterials } from '../controllers/materialsController.js'

const materialsRouter = express.Router()

materialsRouter.post('/addmaterials', addMaterial)
materialsRouter.get('/materials', materials)
materialsRouter.post('/removematerials', removeMaterials)

export default materialsRouter