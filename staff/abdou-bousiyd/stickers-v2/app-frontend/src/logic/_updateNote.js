function updateNote(username, noteId, text, callback) {
    const userExists = db.users.some(user => user.username === username)

    if (!userExists) {
        callback(new Error(`username "${username}" does not exist`))

        return
    }

    const note = db.notes.find(note => note.id === noteId)

    if (!note) {
        callback(new Error(`note with id "${noteId}" does not exist`))

        return
    }

    if (note.username !== username) {
        callback(new Error(`user "${username}" does not own note with id "${noteId}"`))

        return
    }

    note.text = text

    callback(null)
}