const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const reaction = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    type: {
        type: Number,
        enum: [0 /* like */, 1 /* love */, 2 /* haha */, 3 /* sad */, 4 /* angry */, 5 /* wow */],
        default: 0
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = reaction