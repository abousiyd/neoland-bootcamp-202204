describe('authenticateUser', () => {
    it('should succeed on existing user with correct credentials', () => {
        db.users.length = 0

        db.users.push({
            name: 'John Doe',
            username: 'johndoe',
            password: '123123123'
        })

        authenticateUser('johndoe', '123123123', error => {
            expect(error).toBeNull()
        })

        db.users.length = 0
    })

    it('should fail on existing user with incorrect password', () => {
        db.users.length = 0

        db.users.push({
            name: 'John Doe',
            username: 'johndoe',
            password: '123123123'
        })

        authenticateUser('johndoe', 'wrong-123123123', error => {
            expect(error).not.toBeNull()
            expect(error.message).toBe('wrong credentials')
        })

        db.users.length = 0
    })

    it('should fail on existing user with incorrect username', () => {
        db.users.length = 0

        db.users.push({
            name: 'John Doe',
            username: 'johndoe',
            password: '123123123'
        })

        authenticateUser('wrong-johndoe', '123123123', error => {
            expect(error).not.toBeNull()
            expect(error.message).toBe('wrong credentials')
        })

        db.users.length = 0
    })

    it('should fail on non-existing user', () => {
        db.users.length = 0

        authenticateUser('johndoe', '123123123', error => {
            expect(error).not.toBeNull()
            expect(error.message).toBe('wrong credentials')
        })

        db.users.length = 0
    })
})