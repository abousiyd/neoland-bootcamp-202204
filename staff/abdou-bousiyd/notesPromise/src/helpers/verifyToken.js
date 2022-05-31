const { verify } = require('jsonwebtoken')


function verifyToken(req) {
    const {headers: {authorization}} = req
    const [, token] = authorization.split(' ')
    const { sub: userId } = verify(token, 'a pepito le gusta el nudismo')
    return userId
}

module.exports = verifyToken