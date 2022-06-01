const { createNote } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)
        const {body: {text}} = req

        createNote(userId, text)
            .then(noteId => res.status(201).send({noteId}))
            .catch(error => handleErrorsAndRespond(error, res))
    }catch(error) {
        handleErrorsAndRespond(error, res)
    }
}