import { useState, useEffect } from 'react'
import Alert from './Alert'
import Sticker from './Sticker'
import { retrieveNotes } from '../logic/'
import './StickerList.sass'
// import Note from '../data/Note'

function StickerList() {
    const [alert, setAlert] = useState(null)
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, []);

    const loadNotes = () => {
        retrieveNotes(sessionStorage.token, (error, _notes) => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
            setNotes( _notes )
        })
    }

    const handleRemoveSticker = stickerId => {
        const _notes = notes.filter(note => note.id !== stickerId)
        setNotes(_notes)
    }

    return notes && notes.length ?
        <ul className="StickerList">
            
            {notes.map(note => <li key={note.id}>
                <Sticker stickerId={note.id} text={note.text} onRemove={handleRemoveSticker} />
                </li>)}
        </ul>
        :
        <div>
            <p>no stickers yet</p>
            {alert && alert}
        </div>
}
    
export default StickerList;