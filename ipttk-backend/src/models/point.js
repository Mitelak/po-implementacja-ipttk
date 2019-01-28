import mongoose from 'mongoose'
import shortid from 'shortid'

const Point = mongoose.Schema({
    name: {type: String, required: true},
    coordinates: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    shortId: {type: String, default: shortid.generate}
},
{
    versionKey: false,
})

export default mongoose.model('Point', Point)