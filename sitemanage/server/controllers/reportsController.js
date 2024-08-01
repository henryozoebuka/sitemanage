import ReportsModel from "../models/reports.js"

// post report
const postReport = async (req, res) => {
    try {
        const post = await ReportsModel.create(req.body)
        if (post) {
            res.status(200).json({
                message: 'You have successfully posted your report.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error occurred while processing your request.'
        })
    }
}

//fetch reports
const fetchReports = async (req, res) => {
    try {
        const reports = await ReportsModel.find()
        if (!reports) {
            res.status(201).json({ message: 'There are no reports in your records.' })
        } else {
            res.status(200).json(reports)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error occurred while process your request.' })
    }
}

export { postReport, fetchReports }