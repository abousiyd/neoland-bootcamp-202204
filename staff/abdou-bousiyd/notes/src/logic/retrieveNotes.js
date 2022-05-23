// const { json } = require('body-parser')
const { access, readdir, readFile } = require('fs')
const { NotFoundError } = require('../errors')
const { Note } = require('../models')

function retrieveNotes(userId, callback) {
    access(`./db/users/${userId}.json`, error => {
        if (error) return callback(new NotFoundError(`user with id ${userId} not found`))

        readdir('./db/notes', (error, files) => {
            if (error) return callback(error)
            const notes = []

            if (!files.length)
                callback(null, notes)
            else{
                let count = 0, _error

                files.forEach(file => {
                    readFile(`./db/notes/${file}`, 'utf8', (error, json) => {
                        if (!_error) {
                            if (error) return callback(_error = error)

                            count++

                            // const note = JSON.parse(json)
                            const note = Note.fromJson(json)

                            // note.date = new Date(note.date)

                            if (note.user === userId)
                                notes.push(note)

                            if (count === files.length) {
                                notes.sort((note1, note2) => {
                                    return note1.date - note2.date
                                })

                                callback(null, notes)
                            }
                        }
                    })
                })
            }
        })
    })
}

module.exports = retrieveNotes;