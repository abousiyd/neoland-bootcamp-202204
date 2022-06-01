const { readdir, readFile, writeFile } = require('fs')
const { ConflictError } = require('../errors')
const {User} = require('../models')
const { createId } = require('../utils')

function createUser(name, username, password, callback) { 

    readdir('./db/users', (error, files) => {
        if(error) return callback(error)

        let count = 0, _error // para tomar el control de la liada asíncrona que hemos hecho

        if(files.length)
            files.forEach(file => { // de forma sincrona va a lanzar todos los readFile(se lanzan todos)
                readFile(`./db/users/${file}`, 'utf8', (error, json)=>{ // esto llega cuando llegue, tarda tiempo
                    if(!_error) { // En la primera esta siempre es undefined
                        if(error) return callback(_error = error)

                        count++

                        const user = JSON.parse(json)

                        if(user.username === username)
                            return callback(_error = new ConflictError(`username ${username} already existe`))
                        if(count === files.length) {
                            const user = new User(name, username, password)
                            const json = JSON.stringify(user, null, 4 )   //pk num 4
                            const userId = createId()

                            writeFile(`./db/users/${userId}.json`, json, error => {
                                if (error) return callback(error)
                                callback(null, userId)
                            })
                        }
                    }

                })
            })
        else {
            const user = new User(name, username, password)
            const json = JSON.stringify(user, null, 4)
            const userId = createId()
            writeFile(`./db/users/${userId}.json`, json, error => {
                if (error) return callback(error)
                callback(null, userId)
            })
        }
    })

}

module.exports = createUser