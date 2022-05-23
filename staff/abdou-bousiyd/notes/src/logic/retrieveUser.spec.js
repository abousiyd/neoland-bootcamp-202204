const { readdir, unlink, writeFile } = require("fs")
const retrieveUser = require('./retrieveUser')
const { expect } = require('chai')
const { User } = require("../models")
const { createId } = require('../utils')
const { NotFoundError } = require('../errors')


describe('retrieveUser', () => {
    it('succeds on existing user and correct user id', done => {
        readdir(`./db/users`, (error, files) => {
            if(error) return done(error)
            let count = 0, _error

            if(files.length)
                files.forEach(file => {
                    unlink(`./db/users/${file}`, error => {
                        if(!_error) {
                            if(error) return done(_error = error)

                            count++

                            if(count == files.length) {
                                const user = new User('Abdou Doe', 'abdoudoe', '123')
                                const json = JSON.stringify(user)
                                const _userId = createId()

                                writeFile(`./db/users/${_userId}.json`, json, error => {
                                    if (error) return done(error)

                                    retrieveUser(_userId, (error, user) => {
                                        expect(error).to.be.null

                                        expect(user).to.exist
                                        expect(user.name).to.equal('Abdou Doe')
                                        expect(user.username).to.equal('abdoudoe')
                                        expect(user.password).to.be.undefined

                                        done()
                                    })
                                })
                            }
                        }
                            
                    })
                })
            else {
                const user = new User('Maria Doe', 'mariadoe', '123123123')

                const json = JSON.stringify(user)

                const _userId = createId()

                writeFile(`./db/users/${_userId}.json`, json, error => {
                    if (error) return done(error)

                    retrieveUser(_userId, (error, user) => {
                        expect(error).to.be.null

                        expect(user).to.exist
                        expect(user.name).to.equal('Abdou Doe')
                        expect(user.username).to.equal('abdoudoe')
                        expect(user.password).to.be.undefined

                        done()
                    })
                })
            }
        })
    })

    it('fails on existing user and incorrect user id', done => {
        readdir(`./db/users`, (error, files) => {
            if(error) return done(error)

            let count = 0, _error

            if(files.length)
                files.forEach(file => {
                    unlink(`./db/users/${file}`, error => {
                        if(!_error) {
                            if (error) return done(_error = error)
                            count ++
                            if(count == files.length) {
                                const user = new User('abdou bousiyd', 'abousiyd', '123')
                                const json = JSON.stringify(user)
                                const _userId = createId()
                                writeFile(`./db/users/${_userId}.json`, json, error => {
                                    if (error) return done(error)
    
                                    const userId = _userId + '-wrong'
    
                                    retrieveUser(userId, (error, user) => {
                                        expect(error).to.be.exist
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal(`user with id ${userId} not found`)
    
                                        expect(user).to.be.undefined
    
                                        done()
                                    })
                                })
    
                            }
                        }
                    })
                })
            else {
                const user = new User('abdou bousiyd', 'abousiyd', '123')

                const json = JSON.stringify(user)

                const _userId = createId()

                writeFile(`./db/users/${_userId}.json`, json, error => {
                    if (error) return done(error)

                    const userId = _userId + '-wrong'

                    retrieveUser(userId, (error, user) => {
                        expect(error).to.be.exist
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`user with id ${userId} not found`)

                        expect(user).to.be.undefined

                        done()
                    })
                })
            }
        })
    })
})