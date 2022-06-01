import { useState } from 'react'
import { deleteNote } from '../logic/'
import { saveNote } from '../logic/'
import Alert from './Alert'
import './Sticker.sass'

function Sticker(props) {
    const [alert, setAlert] = useState(null)

    const handleRemoveClick = () => {
        const { stickerId, onRemove } = props

        if (stickerId)
            deleteNote(sessionStorage.token, stickerId, error => {
                if (error) {
                    setAlert(<Alert error message={error.message} />)
                    setTimeout( () => {
                        setAlert(null)
                    }, 4000 )
                    return
                }
                onRemove(stickerId)
            })
    }

    const handleSaveSubmit = event => {
        event.preventDefault()
        const { target: { text: { value: text } } } = event
        const {stickerId} = props

        saveNote(sessionStorage.token, stickerId, text, error => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
        setAlert(<Alert message='Sticker Saved' />)
            setTimeout( () => {
                setAlert(null)
            }, 4000 )
        })
    }

    return <div className="Sticker">
        {alert && alert}

        <button className="Button" onClick={handleRemoveClick}>x</button>

        <form className="Sticker__form" onSubmit={handleSaveSubmit}>
            <textarea className="Sticker__text" name="text" defaultValue={props.text}></textarea>
            <p className="Sticker__id">{props.stickerId}</p>
            <button className="Button">Save</button>
        </form>
    </div>
}

export default Sticker; 