import Apium from "../vendor/Apium"
import Note from "../data/Note"

export default function saveNote(token, noteId, text, callback) {
    const url = 'https://b00tc4mp.herokuapp.com/api/v2/users'
    const api = new Apium

    api.call('GET', url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token, noteId, text })
    }, (error, {status, payload}) => {
        if(error) return callback(error)
        if(status === 200) {            
            const data = JSON.parse(payload)
            const { notes = [] } = data
            let note
            if (noteId) {
                note = notes.find(note => note.id === noteId)

                if (note)
                    note.text = text
                else {
                    note = new Note(noteId, text)

                    notes.push(note)
                }
            } else {
                note = new Note(null, text)

                notes.push(note)
            }
            api.call('PATCH', url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notes })
            }, (error, response) => {
                if (error) return callback(error)
                const { status, payload } = response
                if (status >= 400 && status < 500) {
                    const data = JSON.parse(payload)
        
                    callback(new Error(data.error))
                } else if (status >= 500)
                    callback(new Error('server error'))
                else if (status === 204) {
                    callback(null)
                }
            })
        }else if (status >= 400 && status < 500) {
            const data = JSON.parse(payload)
            callback(new Error(data.error))
        } else {
            callback(new Error('server error'))
        }
    })
}


// function saveNote(token, noteId, text, callback) {

//     const xhr = new XMLHttpRequest

//     xhr.addEventListener('load', event => {

//         const status = event.target.status

//         if (status === 200) {
//             const json = event.target.responseText
//             const data = JSON.parse(json)
//             const { notes = [] } = data
//             let note
//             if (noteId) {
//                 note = notes.find(note => note.id === noteId)

//                 if (note)
//                     note.text = text
//                 else {
//                     note = new Note(noteId, text)

//                     notes.push(note)
//                 }
//             } else {
//                 note = new Note(null, text)

//                 notes.push(note)
//             }

//             {
//                 const xhr = new XMLHttpRequest

//                 xhr.addEventListener('load', event => {

//                     const status = event.target.status

//                     if (status === 204) {
//                         callback(null, note.id)
//                     } else if (status >= 400 && status < 500) {
//                         const json = event.target.responseText

//                         const data = JSON.parse(json)

//                         // callback(new Error(data.error))
//                     } else callback(new Error('server error'))
//                 })

//                 xhr.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')
//                 console.log(token, 333)

//                 xhr.setRequestHeader('Authorization', `Bearer ${token}`)
//                 xhr.setRequestHeader('Content-Type', 'application/json')

//                 const data = { notes }

//                 const json = JSON.stringify(data)

//                 xhr.send(json)

//             }
//         } else if (status >= 400 && status < 500) {
//             const json = event.target.responseText

//             const data = JSON.parse(json)

//             callback(new Error(data.error))
//         } else callback(new Error('server error'))
//     })

//     xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

//     xhr.setRequestHeader('Authorization', `Bearer ${token}`)

//     xhr.send()

// }

