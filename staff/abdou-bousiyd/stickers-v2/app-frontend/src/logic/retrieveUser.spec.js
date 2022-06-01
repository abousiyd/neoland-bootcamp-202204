describe('retrieveUser', () => {
    it('should succeed on existing user (username)', () => {
        db.users.length = 0

        db.users.push({
            name: 'John Smith',
            username: 'johnsmith',
            password: '123123123'
        })

        retrieveUser('johnsmith', (error, user) => {
            expect(error).toBeNull()

            expect(user).toBeDefined()
            expect(user.name).toBe('John Smith')
            expect(user.username).toBe('johnsmith')
            expect(user.password).toBeUndefined()
        })

        db.users.length = 0
    })

    it('fail succeed on existing user but incorrect username lookup', () => {
        db.users.length = 0

        db.users.push({
            name: 'John Smith',
            username: 'johnsmith',
            password: '123123123'
        })

        retrieveUser('johnsmith' + '-wrong', (error, user) => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('user with username "johnsmith-wrong" does not exist')

            expect(user).toBeUndefined()
        })
        
        db.users.length = 0
    })
})