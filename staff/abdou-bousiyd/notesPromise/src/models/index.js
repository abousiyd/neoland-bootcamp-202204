
const { model } = require('mongoose')
const { user, note } = require('./schemas') 

const User = model('User', user)
const Note = model('Note', note)

module.exports = {
    User,
    Note
}