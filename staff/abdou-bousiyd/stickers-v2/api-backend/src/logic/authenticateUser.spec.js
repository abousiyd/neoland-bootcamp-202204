const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('../errors')
const authenticateUser = require('./authenticateUser')
const { expect } = require('chai')

describe('authenticateUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', ()=> {
        let user 
        beforeEach(() => {
            user = new User({ name:"Papa Gayo", username:"papagayo", password:"123"})
    
            return user.save()
        })

        it('succeeds on correct credentials', () => 
        
            authenticateUser('papagayo', '123')
                .then(userId => {
                    expect(userId).to.be.a('string')
                    expect(userId).to.equal(user.id)
                })
        )

        it('fails on incorrect password', () =>
                authenticateUser('papagayo', '123123123-wrong')
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(AuthError)
                        expect(error.message).to.equal('wrong credentials')
                    })
            )

            it('fails on incorrect username', () =>
                authenticateUser('papagayo-wrong', '123')
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(AuthError)
                        expect(error.message).to.equal('wrong credentials')
                    })
            )
    })

    false && describe('when user does not exist', () => {
        it('fails on credentials from non-existing user', () =>
            authenticateUser('papagayo', '123123123')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )
        afterEach(() => User.deleteMany())
    
        after(() => disconnect())
    })
})
