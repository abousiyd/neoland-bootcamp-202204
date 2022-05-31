const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const { validateStringNotEmptyNoSpaces, validateString } = require('../validators')

function updateNote(userId, noteId, text) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(noteId, 'note id')
    validateString(text, 'text')

    return User.findById(userId).lean()
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Note.findById(noteId)
        })
        .then(note => {
            if (!note)
                throw new NotFoundError(`note with id ${noteId} does not exist`)

            if (note.user.toString() !== userId)
                throw new AuthError(`note with id ${noteId} does not belong to user with id ${userId}`)

            note.text = text

            return note.save()
        })
        .then(() => {})

}

module.exports = updateNote