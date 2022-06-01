const { deleteNote } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try{
        const userId = verifyToken(req)

        const { params: { noteId } } = req

        deleteNote(userId, noteId)
            .then(() => res.status(204).send())
            .catch(error => handleErrorsAndRespond(error, res))
    }catch(error) {
        handleErrorsAndRespond(error, res)
    }
}