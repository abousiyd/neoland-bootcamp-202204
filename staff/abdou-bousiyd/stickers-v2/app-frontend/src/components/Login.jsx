import { useState } from 'react'
import { authenticateUser } from '../logic/'
import Alert from "./Alert"
import './Auth.sass'

function Login(props) {
    const [alert, setAlert] = useState(null)

    const handleFormSubmit = e => {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        authenticateUser(username, password, (error, token ) => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
            sessionStorage.token = token
            props.onUserLoggedIn()
        })
    }

    const handleRegisterLinkClick = e => {
        e.preventDefault()
        props.onRegisterNavigation()
    }


    return <div className="Auth">
        <form className="form" onSubmit={handleFormSubmit}>
            {alert && alert}
            <input className="input" type="text" name="username" placeholder="username" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button">Login</button >
            <a href="#" className="button" onClick={handleRegisterLinkClick}>Register</a>
        </form>
    </div>
}

export default Login;