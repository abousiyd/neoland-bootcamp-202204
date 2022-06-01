const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const createNote = require('./createNote')
const { expect } = require('chai')

describe('createNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('when user already exists', () => {
        let user

        beforeEach(() => {debugger
            user = new User({ name: 'Papa Gayo', username: 'papagayo', password: '123' })
            return user.save()
        })

        it('succeeds on correct user data', () => 
            createNote(user.id, 'Hola Mundo')
                .then(noteId => {debugger
                    expect(noteId).to.be.a('string')
                    return Note.findById(noteId)
                })
                .then( note => {
                    expect(note.user.toString()).to.equal(user.id)
                    expect(note.text).to.equal('Hola Mundo')
                    expect(note.date).to.be.instanceOf(Date)
                })
        )
        it('fails on incorrect user id', () => {
            const wrongId = new ObjectId().toString()

            return createNote(wrongId, 'Hello World')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongId} does not exist`)
                })
        })
    })

    describe('when user does not exist', () => {
        it('fails on unexisting user id', () => {
            const unexistingUserId = new ObjectId().toString()

            return createNote(unexistingUserId, 'Hello World')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${unexistingUserId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})