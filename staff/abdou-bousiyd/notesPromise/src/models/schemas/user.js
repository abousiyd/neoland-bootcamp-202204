const { Schema } = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    email: {
        type: String
    },

    phone: {
        type: String
    }
})

module.exports = user