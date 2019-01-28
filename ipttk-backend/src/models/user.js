import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const User = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    pesel: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    type: {type: Number, required: true},
    mountainGroup: {type: Array, required: false},
    image: {type: String, required: false},
    isDisabled: {type: String, required: false}
},
{
    versionKey: false,
})

User.plugin(uniqueValidator);

export default mongoose.model('User', User)