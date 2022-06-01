const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const createNote = require('./createNote')
const retrieveNotes = require('./retrieveNotes')
const updateNote = require('./updateNote')
const deleteNote = require('./deleteNote')
// const saveNote = require('./saveNote')


module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    
    createNote,
    retrieveNotes,
    updateNote,
    deleteNote
    // saveNote
}