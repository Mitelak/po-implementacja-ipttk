import mongoose from 'mongoose'
import shortid from 'shortid'

const Segment = mongoose.Schema({
    startPoint: {type: String, required: true},
    endPoint: {type: String, required: true}, 
    gotPoints: {type: Number, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    shortId: {type: String, default: shortid.generate},
    mountainGroup: {type: String, required: true}
},
{
    versionKey: false,
})

export default mongoose.model('Segment', Segment)