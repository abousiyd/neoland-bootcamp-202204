import { useState, useEffect } from 'react'
import { retrieveUser, saveNote } from '../logic/'
import Alert from "./Alert"
import Profile from './Profile'
import StickerList from './StickerList'
import './Home.sass'

function Home(props) {

    const [alert, setAlert] = useState(null)
    const [view, setView] = useState(null)
    const [name, setName] = useState(null)
    const [timestamp, setTimestamp] = useState(null)

    useEffect(()=>{
        handleRetriveUser()
    },[])

    const handleRetriveUser = () => {
        retrieveUser(sessionStorage.token, (error, user) => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
            setName(user.name)
            setView('list')
        })
    }

    const handleAddClick = () => {
        saveNote(sessionStorage.token, null, null, error => {
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }
            setTimestamp( Date.now() )
        })
    }

    const handleLogoutClick = () => {
        delete sessionStorage.token
        props.onUserLoggedOut()
    }

    const handleProfileNavigation = () => setView('profile')

    const handleHomeClick = () => setView('list')

    return <div className="Home">
        {alert && alert}
        <header className="Home__header">
            <a className="Home__header__stickers" onClick={handleHomeClick}>📋</a>
            <a className="Home__header__profile" onClick={handleProfileNavigation}>{name}</a>
            <a className="Home__header__logout" onClick={handleLogoutClick}>Logout</a>
        </header>

        <main className="Home__body Container">
            { view === 'list' && <StickerList timestamp={timestamp} />}
            { view === 'profile' && <Profile handleRetriveUser={handleRetriveUser} username={sessionStorage.username} />}
        </main>

        <footer className="Home__footer">
            <button className="Home__footer__add" onClick={handleAddClick}>+</button>
        </footer>
    </div>
}

export default Home;