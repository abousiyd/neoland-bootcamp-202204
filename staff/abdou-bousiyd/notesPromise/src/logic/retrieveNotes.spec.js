const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const retrieveNotes = require('./retrieveNotes')
const { expect } = require('chai')

describe('retrieveNotes', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    describe('on existing users and notes', () => {
        let user

        beforeEach(() => {
            user = new User({ name: 'Papa Gayo', username: 'papagayo', password: '123123123' })
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
                retrieveNotes(user.id)
                    .then(notes => {
                        expect(notes).to.be.instanceOf(Array)

                        expect(notes).to.have.lengthOf(3)

                        notes.forEach(note => {
                            const found = allNotes.some(_note => {
                                return _note.id === note.id && _note.text === note.text
                            })

                            expect(found).to.be.true
                        })
                    })
            )
         })   

         describe('when user has no notes', () => {
            it('succeeds on correct user data', () =>
                retrieveNotes(user.id)
                    .then(notes => {
                        expect(notes).to.be.instanceOf(Array)

                        expect(notes).to.have.lengthOf(0)
                    })
            )
        })

        it('fails on incorrect user id', () => {
            const wrongId = new ObjectId().toString()

            return retrieveNotes(wrongId)
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

            return retrieveNotes(unexistingUserId)
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