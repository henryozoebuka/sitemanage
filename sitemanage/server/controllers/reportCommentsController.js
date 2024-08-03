import ReportCommentsModel from "../models/reportComments.js"

//post comments
const postComment = async (req, res) => {
    try {
        const comment = await ReportCommentsModel.create(req.body)
        if (comment) {
            res.status(200).json({ message: 'Comment successfully posted' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong while processing your request.' })
    }
}

//fetch report comments
const fetchReportComments = async (req, res) => {
    const {id} = req.params
    try {
        const reportComments = await ReportCommentsModel.find({commentId:id})
            .populate('commentId')
        if(reportComments){
        res.status(200).json(reportComments)
        }
        if(!reportComments){
            res.status(201).json({message: 'No data for this.'})
            console.log('no data console')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error occurred while processing your request.'})
    }
}

export { postComment, fetchReportComments }