const { User } = require('../models')
const { AuthError } = require('../errors')

function authenticateUser(username, password) {debugger
    return User.findOne({ username, password })
        .then(user => {
            if (!user)

                throw new AuthError('wrong credentials')

            return user.id
        })
}

module.exports = authenticateUser