const express = require('express')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, updateUser, retrieveUser, createNote, retrieveNotes, updateNote, deleteNote } = require('./logic')
const { ConflictError, FormatError, AuthError, NotFoundError } = require('./errors')
const { connect, disconnect } = require('mongoose')
const { generateToken, verifyToken } = require('./helpers')

connect('mongodb://localhost:27017/notes-db')
    .then(() => {
        console.log('DB connected')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.post('/api/users', jsonBodyParser, (req, res) => {
            try {
                const { body: { name, username, password } } = req

                registerUser(name, username, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof ConflictError)
                            status = 409

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400

                res.status(status).json({ error: error.message })
            }
        })

        api.post('/api/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { body: { username, password } } = req

                authenticateUser(username, password)
                    .then(userId =>  {
                        // const token = sign({ sub: userId }, 'a pepito le gusta el nudismo')
                        const token = generateToken(userId)
                        res.status(200).json({ token })
                    })
                    .catch(error => {
                        let status = 500

                        if (error instanceof AuthError)
                            status = 401

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400

                res.status(status).json({ error: error.message })
            }
        })

        api.get('/api/users', (req, res) => {
            try {
                // const {headers: {authorization}} = req
                // const [, token] = authorization.split(' ')
                // const { sub: userId } = verify(token, 'a pepito le gusta el nudismo')
                const userId = verifyToken(req)

                retrieveUser(userId)
                    .then(user => res.status(200).json(user))
                    .catch(error => {
                        let status = 500

                        if(error instanceof NotFoundError) 
                            status = 404
                        res.status(status).json({error: error.message})
                    })
            } catch(error) {
                let status = 500
                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400
                res.status(status).json({ error: error.message })
            }
        })

        api.patch('/api/users', jsonBodyParser, (req, res) => {
            try {
                // const {headers: {authorization} } = req
                // const [, token] = authorization.split(' ')
                // const { sub: userId } = verify(token, 'a pepito le gusta el nudismo')
                const userId = verifyToken(req)
                const {body: {name, age, email, phone}} = req

                updateUser(userId, name, age, email, phone)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500
                        if (error instanceof NotFoundError)
                            status = 404
                        res.status(status).json({ error: error.message })
                    })
            }catch(error) {
                let status = 500
                if (error instanceof TypeError || error instanceof FormatError || error instanceof RangeError)
                    status = 400
                res.status(status).json({ error: error.message })
            }
        })

        api.post('/api/notes', jsonBodyParser, (req, res) => {
            try {
                const userId = verifyToken(req)
                const {body: {text}} = req

                createNote(userId, text)
                    .then(noteId => res.status(201).send({noteId}))
                    .catch(error => {
                        let status = 500
                        if (error instanceof NotFoundError)
                            status = 404
                        res.status(status).json({ error: error.message })
                    })
            }catch(error) {
                let status = 500
                if (error instanceof TypeError || error instanceof FormatError || error instanceof RangeError)
                    status = 400
                res.status(status).json({ error: error.message })
            }
        })

        api.get('/api/notes', (req, res) => {
            try{
                const userId = verifyToken(req)

                retrieveNotes(userId)
                    .then(notes => res.status(200).json(notes))
                    .catch(error => {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            }catch(error) {

            }
        })

        api.patch('/api/notes/:noteId', jsonBodyParser, (req, res) => {
            try{
                const userId = verifyToken(req)

                const { params: { noteId }, body: { text } } = req

                updateNote(userId, noteId, text)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof AuthError)
                            status = 401
                        else if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            }catch(error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400
                else if (error instanceof AuthError)
                    status = 401
                res.status(status).json({ error: error.message })
            }
        })

        api.delete('/api/notes/:noteId', jsonBodyParser, (req, res) => {
            try{
                const userId = verifyToken(req)

                const { params: { noteId } } = req

                deleteNote(userId, noteId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof AuthError)
                            status = 401
                        else if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            }catch(error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400
                else if (error instanceof AuthError)
                    status = 401
                res.status(status).json({ error: error.message })
            }
        })

        api.listen(8080, () => console.log('API running'))
    })