describe('createNote', () => {
    it('should succeed for existing user', () => {
        db.users.length = 0
        db.users.push(new User('John Doe', 'john', '123123123'))
        db.notes.length = 0

        createNote('john', 'Adiós Mundo Cruel...', function(error, noteId) {
            expect(error).toBeNull()
            expect(noteId).toBeDefined()
            expect(noteId).toBeInstanceOf(String)

            const note = db.notes[0]

            expect(note).toBeDefined()
            expect(note).toBeInstanceOf(Note)
            expect(note.id).toBe(noteId)
            expect(note.username).toBe('john')
            expect(note.text).toBe('Adiós Mundo Cruel...')
            expect(note.date).toBeDefined()
            expect(note.date).toBeInstanceOf(Date)
        })

        db.notes.length = 0
        db.users.length = 0
    })

    it('should fail for non-existing user', () => {
        db.users.length = 0
        db.notes.length = 0

        createNote('john', 'Adiós Mundo Cruel...', function(error) {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('username "john" does not exist')
        })

        db.notes.length = 0
        db.users.length = 0
    })
})