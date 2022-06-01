const { registerUser } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => { 
    try {
        const { body: { name, username, password } } = req

        registerUser(name, username, password)
            .then(() => res.status(201).send())
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}