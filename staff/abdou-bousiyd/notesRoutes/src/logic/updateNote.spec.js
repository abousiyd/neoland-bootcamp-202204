const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const updateNote = require('./updateNote')
const { expect } = require('chai')

describe('updateNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = new User({ name: 'Ele Fante', username: 'elefante', password: '123123123' })

            return user.save()
        })
        describe('when user already has notes', () => {
            let note1, note2, note3, allNotes

            beforeEach(() => {
                note1 = new Note({ user: user.id, text: 'note 1' })
                note2 = new Note({ user: user.id, text: 'note 2' })
                note3 = new Note({ user: user.id, text: 'note 3' })

                return Promise.all([note1.save(), note2.save(), note3.save()])
                    .then(notes => allNotes = notes)
            })

            it('succeeds on correct user data', () =>
                updateNote(user.id, note2.id, 'new note 2')
                    .then(result => {
                        expect(result).to.be.undefined
                        return Note.findById(note2.id)
                    })
                    .then(note2 => expect(note2.text).to.equal('new note 2'))
            )
        })

        describe('when user has no notes', () => {
            it('succeeds on correct user data', () => {
                const unexistingNoteId = new ObjectId().toString()

                return updateNote(user.id, unexistingNoteId, 'new note 2')
                    .then(() => {
                        throw new Error('should not reach point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`note with id ${unexistingNoteId} does not exist`)
                    })
            })
        })

        it('fails on incorrect user id', () => {
            const wrongUserId = new ObjectId().toString()
            const unexistingNoteId = new ObjectId().toString()

            updateNote(wrongUserId, unexistingNoteId, 'new note 2')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongUserId} does not exist`)
                })
        })
    })

    describe('when user does not exist', () => {
        it('fails on unexisting user id', () => {
            const unexistingUserId = new ObjectId().toString()
            const unexistingNoteId = new ObjectId().toString()

            updateNote(unexistingUserId, unexistingNoteId, 'new note 2')
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