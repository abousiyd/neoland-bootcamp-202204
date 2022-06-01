describe('updateUserPassword', () => {
    it('succeeds when user exists and password is correct', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserPassword('chocolater', '123123123', '234234234', '234234234', error => {
            expect(error).toBeNull()

            const user = db.users.find(user => user.username === 'chocolater')

            expect(user.password).toBe('234234234')
        })

        db.users.length = 0
    })

    it('fails when user exists and password is incorrect', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserPassword('chocolater', '123123123' + '-wrong', '234234234', '234234234', error => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong password')
        })

        db.users.length = 0
    })

    it('fails when user exists and password is same as new password', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserPassword('chocolater', '123123123', '123123123', '123123123', error => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('current password and new password are the same')
        })

        db.users.length = 0
    })

    it('fails when user exists and new password is not the same as new password repeat', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserPassword('chocolater', '123123123', '234234234', '234234234' + '-wrong', error => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('new password and new password repeat are not the same')
        })

        db.users.length = 0
    })
})