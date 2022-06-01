const { retrieveNotes } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try{
        const userId = verifyToken(req)

        retrieveNotes(userId)
            .then(notes => res.status(200).json(notes))
            .catch(error => handleErrorsAndRespond(error, res))
    }catch(error) {
        handleErrorsAndRespond(error, res)
    }
}