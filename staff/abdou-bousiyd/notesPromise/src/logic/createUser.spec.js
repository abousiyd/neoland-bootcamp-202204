const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { ConflictError } = require('../errors')
const createUser = require('./createUser')
const { expect } = require('chai')

describe('createUser', () => { debugger
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct credencials', () => {
        return createUser('Peter Pan', 'peterpan', '123123123')
            .then(result => {
                expect(result).to.be.undefined

                return User.findOne({ username: 'peterpan' })
            })
            .then(user => {
                expect(user.name).to.equal('Peter Pan')
                expect(user.username).to.equal('peterpan')
                expect(user.password).to.equal('123123123')
            })
    })

    it('fails when user already exists', () => {
        return User.create({ name: 'Wendy Pan', username: 'wendypan', password: '123123123'})
            .then(() => createUser('Wendy Pan', 'wendypan', '123123123'))
            .catch(error => {
                expect(error).to.be.instanceOf(ConflictError)
                expect(error.message).to.equal(`user with username wendypan already exists`)
            })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})