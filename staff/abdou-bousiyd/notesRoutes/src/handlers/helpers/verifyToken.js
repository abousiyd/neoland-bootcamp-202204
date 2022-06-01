const { verify } = require('jsonwebtoken')
const { AuthError } = require('../../errors')


function verifyToken(req) {
    const {headers: {authorization}} = req
    if (!authorization) throw new AuthError('no authorization header received (with token)')
    const [, token] = authorization.split(' ')
    // const { sub: userId } = verify(token, 'a pepito le gusta el nudismo')
    const { sub: userId } = verify(token, process.env.JWT_SECRET)
    return userId
}

module.exports = verifyToken