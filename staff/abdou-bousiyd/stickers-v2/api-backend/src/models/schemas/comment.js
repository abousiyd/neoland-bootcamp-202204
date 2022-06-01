const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const reaction = require('./reaction')

const comment = new Schema({
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
    },

    reactions: [reaction]
})

module.exports = comment