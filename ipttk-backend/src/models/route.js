import mongoose from 'mongoose'
import shortid from 'shortid'

const Route = mongoose.Schema({
    date: {type: Date, required: true},
    segments: [{
        shortId: {type: String, required: true},
        time: {type: Number, required: true}
    }],
    name: {type: String, required: true},
    comments: {type: String, required: false},
    verified: {type: Boolean, default: false},
    accepted: {type: Boolean, default: false},
    createdBy: {type: String, required: true},
    shortId: {type: String, default: shortid.generate},
    mountainGroup: {type: String, required: true}
},
{
    versionKey: false,
})

export default mongoose.model('Route', Route)