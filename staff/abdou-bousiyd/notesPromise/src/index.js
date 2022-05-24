const { connect, disconnect } = require('mongoose')
const { User, Note } = require('./models')

connect('mongodb://localhost:27017/notes-db', error => {
    if (error) return console.error(error)

    const user = new User({ name: 'Pepito Grillo', username: 'pepigri', password: '123123123' })

    user.save()
        .then(user => {
            const note = new Note({ user: user.id, text: 'hola mundo' })

            return note.save()
        })
        .then(note => disconnect())
})