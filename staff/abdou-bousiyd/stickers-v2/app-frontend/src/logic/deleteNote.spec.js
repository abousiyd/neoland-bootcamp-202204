describe('deleteNote', () => {
    it('succeeds when user and note already exist', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        deleteNote('papagayo', note.id, error => {
            expect(error).toBeNull()

            const _note = db.notes.find(__note => __note.id === note.id)

            expect(_note).toBeUndefined()
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user exists, but note does not', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        deleteNote('papagayo', note.id + '-wrong', error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`note with id "${note.id + '-wrong'}" does not exist`)
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user does not exist', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        deleteNote('papagayo' + '-wrong', note.id, error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`username "${'papagayo' + '-wrong'}" does not exist`)
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user is not the owner of the note', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        deleteNote('lechunga', note.id, error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`user "lechunga" does not own note with id "${note.id}"`)
        })

        db.users.length = 0
        db.notes.length = 0
    })
})