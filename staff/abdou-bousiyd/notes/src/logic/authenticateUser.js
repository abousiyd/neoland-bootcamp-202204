const { readdir, readFile } = require("fs");
const { AuthError } = require('../errors')

function authenticateUser(username, password, callback) {
    readdir('./db/users', (error, files) => {
        if(error) return callback(error)

        let count = 0, _error, userId

        if(files.length) 
            files.forEach(file => {
                readFile(`./db/users/${file}`, 'utf8', (error, json) => {
                    if(!_error && !userId) {
                        if (error) return callback(_error = error)
                        count++
                        const user = JSON.parse(json)

                        if (user.username === username && user.password === password) {
                            userId = file.substring(0, file.indexOf('.')) // ex: 1234qfasdfhas2fas.json
                            callback(null, userId)
                            return
                        }
                        if (count === files.length) {
                            callback(new AuthError('wrong credentials'))
                        }
                    }
                })
            })
        else callback(new AuthError('wrong credentials'))
    })
}

module.exports = authenticateUser;