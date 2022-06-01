describe('retrieveNotes', () => {
    it('returns user notes when user exists and has notes', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Ba Nana', 'banana', '123123123'))
        db.users.push(new User('Pi Rulo', 'pirulo', '123123123'))

        db.notes.push(new Note('banana', 'Hello, Note! (1)'))
        db.notes.push(new Note('banana', 'Hello, Note! (2)'))
        db.notes.push(new Note('banana', 'Hello, Note! (3)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (4)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (5)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (6)'))

        retrieveNotes('banana', (error, notes) => {
          expect(error).toBeNull()
          
          expect(notes).toBeDefined()
          expect(notes).toHaveSize(3)

          const [note1, note2, note3] = notes

          expect(note1).toBeDefined()
          expect(note1.text).toBe('Hello, Note! (1)')

          expect(note2).toBeDefined()
          expect(note2.text).toBe('Hello, Note! (2)')

          expect(note3).toBeDefined()
          expect(note3.text).toBe('Hello, Note! (3)')
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user does not exist', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Ba Nana', 'banana', '123123123'))
        db.users.push(new User('Pi Rulo', 'pirulo', '123123123'))

        db.notes.push(new Note('banana', 'Hello, Note! (1)'))
        db.notes.push(new Note('banana', 'Hello, Note! (2)'))
        db.notes.push(new Note('banana', 'Hello, Note! (3)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (4)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (5)'))
        db.notes.push(new Note('pirulo', 'Hello, Note! (6)'))

        retrieveNotes('elefante', (error, notes) => {
          expect(error).not.toBeNull()
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('username "elefante" does not exist')

          expect(notes).toBeUndefined()
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('returns empty array of notes when user exists and has no notes', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Ba Nana', 'banana', '123123123'))
        db.users.push(new User('Pi Rulo', 'pirulo', '123123123'))

        db.notes.push(new Note('banana', 'Hello, Note! (1)'))
        db.notes.push(new Note('banana', 'Hello, Note! (2)'))
        db.notes.push(new Note('banana', 'Hello, Note! (3)'))

        retrieveNotes('pirulo', (error, notes) => {
          expect(error).toBeNull()
          
          expect(notes).toBeDefined()
          expect(notes).toHaveSize(0)
        })

        db.users.length = 0
        db.notes.length = 0
    })
})