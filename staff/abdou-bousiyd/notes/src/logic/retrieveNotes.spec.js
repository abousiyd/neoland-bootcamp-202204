const { writeFile } = require('fs')
const retrieveNotes = require('./retrieveNotes')
const { expect } = require('chai')
const { User, Note } = require('../models')
const { createId, deleteFiles } = require('../utils')
// const { NotFoundError } = require('../errors')

describe('retrieveNotes', () => {
    it('succeeds on existing user and has notes', done => {
        deleteFiles('./db/users', error => {
            if (error) return done(error)
            deleteFiles('./db/users', error => {
                if (error) return done(error)
                const user = new User('Maria Doe', 'mariadoe', '123123123')

                const json = JSON.stringify(user)

                const userId = createId()

                writeFile(`./db/users/${userId}.json`, json, error => {
                    if (error) return done(error)
                    const texts = ['note 1', 'note 2', 'note 3']
                    let count = 0, _error 

                    texts.forEach(text => {
                        const noteId = createId()
                        const note = new Note(noteId, userId, text)
                        const json = JSON.stringify(note)

                        writeFile(`./db/users/${userId}.json`, json, error => {
                            if (!_error) {
                                if (error) return done(_error = error)
                                count++
                                if (count === texts.length) {
                                    retrieveNotes(userId, (error, notes) => {
                                        expect(error).to.be.null

                                        expect(notes).to.exist
                                        expect(notes).to.be.instanceOf(Array)

                                        notes.forEach(note => {
                                            expect(note.id).to.be.a('string')
                                            expect(note.user).to.equal(userId)
                                            expect(texts.includes(note.text)).to.be.true
                                            expect(note.date).to.be.instanceOf(Date)
                                        })

                                        done()
                                    })
                                }
                            }
                        })
                    })
                })
            })
        })
    })
})