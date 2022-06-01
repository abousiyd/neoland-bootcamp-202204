const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const { validateStringNotEmptyNoSpaces, validateString } = require('../validators')

function deleteNote(userId, noteId) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(noteId, 'note id')

    return User.findById(userId).lean()
    .then(user => {
        if(!user) throw new NotFoundError(`user with id ${userId} does not exist`)
        return Note.deleteOne({ _id: noteId })
    })
    .then(result => {
        if (!result.deletedCount) throw new NotFoundError(`note with id ${noteId} does not exist`)
    })
    .then(() => { })
}

module.exports = deleteNote