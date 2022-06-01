const { authenticateUser } = require('../logic')
const { handleErrorsAndRespond, generateToken} = require('./helpers')

module.exports = (req, res) => { 
    try {
        const { body: { username, password } } = req

        authenticateUser(username, password)
            .then(userId =>  {
                // const token = sign({ sub: userId }, 'a pepito le gusta el nudismo')
                const token = generateToken(userId)
                res.status(200).json({ token })
            })
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(req, res)
    }
}