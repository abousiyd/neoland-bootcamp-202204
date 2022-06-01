const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema
const reaction = require('./reaction')
const comment = require('./comment')

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
    },

    audience: {
        type: Number,
        enum: [0 /* private */, 1 /* public */, 2 /* friends */],
        default: 0
    },

    reactions: [reaction],

    comments: [comment]
})

module.exports = note