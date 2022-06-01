const { readFile, writeFile } = require('fs')
const saveNote = require('./saveNote')
const { expect } = require('chai')
const { NotFoundError } = require('../errors')
const { User, Note } = require('../models')
const { createId } = require('../utils')
const { deleteFiles } = require('../utils')

describe('saveNote', () => {
    it('succeeds for existing user and new note', done => {
        deleteFiles(`./db/users`, error => {
            if (error) return done(error)

            deleteFiles('./db/notes', error => {
                if (error) return done(error)

                const user = new User('Maria Doe', 'mariadoe', '123123123')

                const json = JSON.stringify(user)

                const userId = createId()

                writeFile(`./db/users/${userId}.json`, json, error => {
                    if (error) return done(error)

                    saveNote(userId, null, 'hola mundo', (error, noteId) => {
                        expect(error).to.be.null

                        expect(noteId).to.be.a('string')

                        const file = `./db/notes/${noteId}.json`

                        readFile(file, 'utf8', (error, json) => {
                            expect(error).to.be.null

                            expect(json).to.be.a('string')

                            const note = JSON.parse(json)
                            expect(note.user).to.equal(userId)
                            expect(note.id).to.equal(noteId)
                            expect(note.text).to.equal('hola mundo')

                            const date = new Date(note.date)
                            expect(date.toString()).not.to.equal('Invalid Date')

                            done()
                        })
                    })
                })
            })
        })
    })

    it('succeeds for existing user and note', done => {
        deleteFiles(`./db/users`, error => {
            if (error) return done(error)

            deleteFiles('./db/notes', error => {
                if (error) return done(error)

                const user = new User('Maria Doe', 'mariadoe', '123123123')

                const json = JSON.stringify(user)

                const userId = createId()

                writeFile(`./db/users/${userId}.json`, json, error => {
                    if (error) return done(error)

                    const _noteId = createId()

                    const note = new Note(_noteId, userId, 'hello world')

                    const json = JSON.stringify(note)

                    writeFile(`./db/notes/${_noteId}.json`, json, error => {
                        if (error) return done(error)

                        saveNote(userId, _noteId, 'hola mundo', (error, noteId) => {
                            expect(error).to.be.null

                            expect(noteId).to.be.a('string')

                            const file = `./db/notes/${noteId}.json`

                            readFile(file, 'utf8', (error, json) => {
                                expect(error).to.be.null

                                expect(json).to.be.a('string')

                                const note = JSON.parse(json)
                                expect(note.user).to.equal(userId)
                                expect(note.id).to.equal(_noteId)
                                expect(noteId).to.equal(_noteId)
                                expect(note.text).to.equal('hola mundo')

                                const date = new Date(note.date)
                                expect(date.toString()).not.to.equal('Invalid Date')

                                done()
                            })
                        })
                    })
                })
            })
        })
    })

    it('fails when user does not exist', done => {
        deleteFiles(`./db/users`, error => {
            if (error) return done(error)

            deleteFiles('./db/notes', error => {
                if (error) return done(error)

                const userId = 'unknown'

                saveNote(userId, null, 'hola mundo', (error, noteId) => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${userId} not found`)

                    expect(noteId).to.be.undefined

                    done()
                })
            })
        })
    })

    it('fails when user exists, but note not', done => {
        deleteFiles(`./db/users`, error => {
            if (error) return done(error)

            deleteFiles('./db/notes', error => {
                if (error) return done(error)

                const user = new User('Maria Doe', 'mariadoe', '123123123')

                const json = JSON.stringify(user)

                const userId = createId()

                writeFile(`./db/users/${userId}.json`, json, error => {
                    if (error) return done(error)

                    const _noteId = createId()

                    saveNote(userId, _noteId, 'hola mundo', (error, noteId) => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`note with id ${_noteId} not found`)

                        expect(noteId).to.be.undefined

                        done()
                    })
                })
            })
        })
    })
 
})