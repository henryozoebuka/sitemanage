import MaterialsModel from "../models/materials.js";

//add materials
const addMaterial = async (req, res) => {
    try {
        const material = await MaterialsModel.create(req.body)
        if (material) {
            res.status(200).json({ message: `You have added ${material.quantity} ${material.name} to your record!` })
        }
    } catch (error) {
        console.log(error)
    }
}

//remove materials from record
const removeMaterials = async (req, res) => {
    const {name, quantity, removedBy } = req.body
    try {
        const aggregatePipeline = [
            
                {$match: {name: name}},
                {$group: {'_id': null, totalQuantity: {$sum: '$quantity'}}}
        ]

        const removeItems = await MaterialsModel.aggregate(aggregatePipeline)
        if(!removeItems || removeItems.length === 0) {
            res.status(401).json({message: 'No item with such name found.'})
        }
        else if (removeItems[0].totalQuantity < quantity) {
            res.status(201).json({message: `You don't have up to ${quantity} ${name} in your records.`})
        }
        else {
            const nowRemove = await MaterialsModel.create({
                name: name,
                quantity: -quantity,
                removedBy
            })
            res.status(200).json({message: `${quantity} of ${name} have been removed from your records.`})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: 'Error occurred while processing your request.'})
    }
}

//list materials on record
const materials = async (req, res) => {
    try {
        const materials = await MaterialsModel.find()
        .populate('addedBy')
        .populate('removedBy')
        if (!materials) {
            return res.status(201).json({ message: 'No records found.' })
        }
        else {
            return res.status(200).json(materials)
        }

    } catch (error) {
        console.log(error)
    }
}

export { addMaterial, materials, removeMaterials }