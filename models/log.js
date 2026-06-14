import mongoose from 'mongoose'

const logSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Who answered?"]
    },
    email: String,
    level: {
        type: Number,
        required: [true, 'bhai kis level ka tha ye toh batado']
    },
    attempt: {
        type: String,
        required: [true, "ye bhi nahi bataoge attemp kya kiya...."]
    },
    time: {
        type: String
    }
})

export default mongoose.models.Log || mongoose.model('Log', logSchema)