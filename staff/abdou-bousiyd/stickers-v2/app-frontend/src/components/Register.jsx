import { useState } from 'react'
import { registerUser } from '../logic/'
import Alert from './Alert'
import './Auth.sass'

function Register(props) {

    const [alert, setAlert] = useState(null)

    const handleFormSubmit = e => {
        e.preventDefault()

        const name = e.target.name.value
        const username = e.target.username.value
        const password = e.target.password.value
        
        registerUser(name, username, password, error => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
            props.onUserLoggedOut()
        })
    }

    const handleLoginLinkClick = e => {
        e.preventDefault()
        props.onUserLoggedOut()
    }

    return <div className='Auth'>
        <form className="form" onSubmit={handleFormSubmit}>
            {alert && alert}
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="text" name="username" placeholder="username" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button">Register</button>
            <a href="#" className="button" onClick={handleLoginLinkClick}>Login</a>
        </form>
    </div>
}

export default Register;