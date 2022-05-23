const { access, readFile, writeFile } = require('fs')
const { NotFoundError } = require('../errors')
const { Note } = require('../models')

function saveNote(userId, noteId, text, callback) {

    access(`./db/users/${userId}.json`, error => {
        if (error) return callback(new NotFoundError(`user with id ${userId} not found`))

        if (noteId)
            readFile(`./db/notes/${noteId}.json`, 'utf8', (error, json) => {
                if (error) return callback(new NotFoundError(`note with id ${noteId} not found`))

                const note = Note.fromJson(json)

                if (note.text !== text) {
                    note.text = text

                    writeFile(`./db/notes/${noteId}.json`, JSON.stringify(note), error => {
                        if (error) return callback(error)

                        callback(null, noteId)
                    })
                } else callback(null, noteId)
            })
        else {
            const note = new Note(null, userId, text)

            const json = JSON.stringify(note)

            writeFile(`./db/notes/${note.id}.json`, json, error => {
                if (error) return callback(error)

                callback(null, note.id)
            })
        }
    })
}

module.exports = saveNote