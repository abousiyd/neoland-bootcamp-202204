const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema

const note = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
        required: true,
        default: ''
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = note