describe('updateNote', () => {
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

        updateNote('papagayo', note.id, 'Hello, Note! (6)', error => {
            expect(error).toBeNull()

            const _note = db.notes.find(__note => __note.id === note.id)

            expect(_note.text).toBe('Hello, Note! (6)')
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

        updateNote('papagayo', note.id + '-wrong', 'Hello, Note! (6)', error => {
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

        updateNote('papagayo' + '-wrong', note.id, 'Hello, Note! (6)', error => {
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

        updateNote('lechunga', note.id, 'Hello, Note! (6)', error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`user "lechunga" does not own note with id "${note.id}"`)
        })

        db.users.length = 0
        db.notes.length = 0
    })
})