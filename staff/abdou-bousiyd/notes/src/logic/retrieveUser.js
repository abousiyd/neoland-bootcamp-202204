const { readFile } = require('fs')
const { NotFoundError } = require('../errors')

function retrieveUser(userId, callback) {
    readFile(`./db/users/${userId}.json`, 'utf8', (error, json) => {
        if(error) return callback(new NotFoundError(`user with id ${userId} not found`))

        const user = JSON.parse(json)

        delete user.password

        callback(null, user)
    })
}

module.exports = retrieveUser