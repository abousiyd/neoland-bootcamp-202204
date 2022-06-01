const { updateUser } = require('../logic')
const { handleErrorsAndRespond, verifyToken} = require('./helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)
        const {body: {name, age, email, phone}} = req

        updateUser(userId, name, age, email, phone)
            .then(() => res.status(204).send())
            .catch(error => handleErrorsAndRespond(error. res))
    }catch(error) {
        handleErrorsAndRespond(error, res)
    }
}