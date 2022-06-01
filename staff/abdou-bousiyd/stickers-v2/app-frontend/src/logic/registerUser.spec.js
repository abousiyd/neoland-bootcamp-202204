describe('registerUser', () => {
    let name, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    it('should succeed on new user', done => {
        registerUser(name, username, password, (error, response) => {
            expect(error).toBeUndefined()

            // expect(response).toBeUndefined()

            done()
        })
    })
})