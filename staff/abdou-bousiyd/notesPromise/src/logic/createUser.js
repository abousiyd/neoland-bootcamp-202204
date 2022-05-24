const { User } = require('../models')
const { ConflictError } = require('../errors')

function createUser(name, username, password) {debugger
    return User.create({ name, username, password })
        .then(() => {

            User.findOne({username}, (error, user) => {
                if(error || user) {
                    return console.log(error)
                }
    
                User.create({name, username, password}, function(error, result) {
                    if (error) return console.log(error);

                    console.log('usuario agregado')
                });  
            })

        })
        .catch(error => {
            if (error.code = 11000)
                throw new ConflictError(`user with username ${username} already exists`)
            
            throw error
        })
}

module.exports = createUser