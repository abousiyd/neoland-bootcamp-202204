const { sign } = require('jsonwebtoken')

function generateToken(userId) {
    const token = sign({ sub: userId }, 'a pepito le gusta el nudismo')

    return token
}

module.exports = generateToken