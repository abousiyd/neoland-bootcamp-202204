function authenticateUser( username, password, callback) {
    const matches = db.users.some(function(user) { 
        return user.username === username && user.password === password
    })

    if (!matches) {
        callback(new Error('username already exists'))
        return
    }
    callback(null)
}