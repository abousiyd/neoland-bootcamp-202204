require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { handleRegisterUser, handleAuthenticateUser, handleRetrieveUser, handleUpdateUser, handleCreateNote, handleRetrieveNotes, handleUpdateNote, handleDeleteNote } = require('./handlers')
const { connect, disconnect } = require('mongoose')

    ; ( async () => {
        await connect('mongodb://localhost:27017/notes-db')
        console.log('DB connected')

        const api = express()
        const jsonBodyParser = bodyParser.json()
        const routes = express.Router()

        routes.post('/users', jsonBodyParser, handleRegisterUser)
        routes.post('/users/auth', jsonBodyParser, handleAuthenticateUser)
        routes.get('/users', jsonBodyParser, handleRetrieveUser)
        routes.patch('/users', jsonBodyParser, handleUpdateUser)

        routes.post('/notes', jsonBodyParser, handleCreateNote)
        routes.get('/notes', jsonBodyParser, handleRetrieveNotes)
        routes.patch('/notes/:noteId', jsonBodyParser, handleUpdateNote)
        routes.delete('/notes/:noteId', jsonBodyParser, handleDeleteNote)
        


        api.use('/api', routes)
        api.listen(8080, () => console.log('API running'))
        process.on('SIGINT', async () => {
            await disconnect()
            console.log('\nDB disconnected')
            process.exit(0)
        })

    })()



        // api.delete('/api/notes/:noteId', jsonBodyParser, (req, res) => {
        //     try{
        //         const userId = verifyToken(req)

        //         const { params: { noteId } } = req

        //         deleteNote(userId, noteId)
        //             .then(() => res.status(204).send())
        //             .catch(error => {
        //                 let status = 500

        //                 if (error instanceof AuthError)
        //                     status = 401
        //                 else if (error instanceof NotFoundError)
        //                     status = 404

        //                 res.status(status).json({ error: error.message })
        //             })
        //     }catch(error) {
        //         let status = 500

        //         if (error instanceof TypeError || error instanceof FormatError)
        //             status = 400
        //         else if (error instanceof AuthError)
        //             status = 401
        //         res.status(status).json({ error: error.message })
        //     }
        // })

        // api.listen(8080, () => console.log('API running'))
    // })
