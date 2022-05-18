// const { readdir, unlink, access, fstat, writeFile } = require('fs')
const { access, constants, readdir, readFile, unlink, rm } = require('fs')

const { createUser } = require('./createUser')
const { expect } = require('chai')


describe('createUser', () => {
    it('should create user if no existent', done => {
        readdir(`./db/users`, (error, files) => {
            if(error) return done(error)

            let count = 0, _error

            if(files.length) {
                files.forEach( file => {
                    unlink(`./db/users/${file}`, error => {
                        if(!_error) {
                            if(error) return done(_error = error)
    
                            count++
    
                            if(count == files.length) {
                                createUser('pepito grillo', 'pepito', '123', (error, userId) => {
                                    expect(error).to.be.null
                                    expect(userId).to.be.a('string')
                                    const file = `./db/users/${userId}.json`
    
                                    access(file, constants.F_OK, error => {
                                        expect(error).to.be.null
    
                                        readFile(file, 'utf8', (error, json) => {
                                            expect(error).to.be.null
    
                                            expect(json).to.be.a('string')
    
                                            const user = JSON.parse(json)
                                            expect(user.name).to.equal('pepito grillo')
                                            expect(user.username).to.equal('pepito')
                                            expect(user.password).to.equal('123')
    
                                            done()
                                        })
                                    })
                                })
                            }
                        }
                    })
                })

            }else {
                createUser('pepito grillo', 'pepito', '123', (error, userId) => {
                    expect(error).to.be.null
                    expect(userId).to.be.a('string')
                    const file = `./db/users/${userId}.json`

                    access(file, constants.F_OK, error => {
                        expect(error).to.be.null

                        readFile(file, 'utf8', (error, json) => {
                            expect(error).to.be.null

                            expect(json).to.be.a('string')

                            const user = JSON.parse(json)
                            expect(user.name).to.equal('pepito grillo')
                            expect(user.username).to.equal('pepito')
                            expect(user.password).to.equal('123')

                            done()
                        })
                    })
                })
            }
        })
    })

})


// const { access, constants, readdir, readFile, unlink, rm } = require('fs')

// const { createUser } = require('./createUser')
// const { expect } = require('chai')


// describe('createUser', () => {
//     it('should create user if no existent', done => {
//         const username = 'user-' + Math.random()
        
//         unlink('./db/users/', error => {
//             if (!error) {
//                 createUser('pepito grillo', username, '123', (error, userId) => {
//                     expect(error).to.be.null
//                     expect(userId).to.be.a('string')
//                     const file = `./db/users/${userId}.json`
        
//                     access(file, constants.F_OK, error => {
//                         expect(error).to.be.null
        
//                         readFile(file, 'utf8', (error, json) => {
//                             expect(error).to.be.null
        
//                             expect(json).to.be.a('string')
        
//                             const user = JSON.parse(json)
//                             expect(user.name).to.equal('pepito grillo')
//                             expect(user.username).to.equal(username)
//                             expect(user.password).to.equal('123')
        
//                             done()
//                         })
//                     })
//                 })
//             } else {
//                 done()
//             }
//         })
//     })


//     it('should fail if user already exist', done => {
//         const username = 'user-' + Math.random()
        
//         unlink('./db/users/', error => {
//             if (!error) {
//                 createUser('pepito grillo', username, '123', () => {
//                     if(error) return done(error)
//                     createUser('pepito grillo', username, '123', (_error, userId) => {
//                         expect(error).to.not.be.null
//                         expect(error.message).to.equal(`username ${username} already exists`)
//                         expect(error).to.be.an.instanceOf(ConflictError)
//                         expect(userId).to.be.undefined
//                         done()
//                     })
//                 })
//             } else {
//                 done()
//             }
//         })
        
//     })
// })
