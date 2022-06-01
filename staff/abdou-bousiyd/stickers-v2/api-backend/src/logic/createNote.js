const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')

function createNote(userId, text) {

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Note.create({ user: userId, text })
        })
        .then(note => note.id)
}

module.exports = createNote