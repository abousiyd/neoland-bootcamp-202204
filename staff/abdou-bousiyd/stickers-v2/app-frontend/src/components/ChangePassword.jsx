import { useState } from 'react'
import {updateUserPassword} from '../logic/'
import Alert from './Alert'

function ChangePassword() {

    const [alert, setAlert] = useState(null);

    const handleSubmit = event => {
        event.preventDefault()
        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordRepeat = event.target.newPasswordRepeat.value

        try {
            updateUserPassword(sessionStorage.token, password, newPassword, newPasswordRepeat, error => {
                if (error) {
                    setAlert(<Alert error message={error.message} />)
                    setTimeout( () => {
                        setAlert(null)
                    }, 4000 )
                    return
                }
                setAlert(<Alert message='Password saved' />)
                setTimeout( () => {
                    setAlert( null )
                }, 4000 )
            })
        } catch(error) {
            setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
        }
    }

    return <div className="ChangePassword">
        {alert && alert}
        
        <form className="Container" onSubmit={handleSubmit}>
            <input className="Input Input--light" type="password" name="password" placeholder="current password" />
            <input className="Input Input--light" type="password" name="newPassword" placeholder="new password" />
            <input className="Input Input--light" type="password" name="newPasswordRepeat" placeholder="repeat new password" />
            <button className="Button Button--light">Save</button>
        </form>
    </div>
}

export default ChangePassword;