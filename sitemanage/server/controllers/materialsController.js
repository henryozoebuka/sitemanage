import MaterialsModel from "../models/materials.js";

//add materials
const addMaterial = async (req, res) => {
    try {
        const material = await MaterialsModel.create(req.body)
        if(material) {
            res.status(200).json({message: `You have added ${material.quantity} ${material.name} to your record!`})
        }
    } catch (error) {
        console.log(error)
    }
}

//list materials on record
const materials = async (req,res) => {
    try {
        const materials = await MaterialsModel.find()
        if(!materials){
            return res.status(201).json({message: 'No records found.'})
        }
        else {
            return res.status(200).json(materials)
        }

    } catch (error) {
        console.log(error)
    }
}

export { addMaterial, materials }