import mongoose from 'mongoose'

const contestantSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, "Email is needed"]
    },
    disqualified: {
        type: Boolean, 
        default: false
    },
    currentLevel: {
        type: Number,
        default: 0
    },
    solvedAt: {
        type: Date,
        default: Date.now
    },
    nonComp: {
        type: Boolean,
        default: false
    }
})

export default mongoose.models.User || mongoose.model('User', contestantSchema)