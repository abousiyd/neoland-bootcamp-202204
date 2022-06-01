import { useState } from 'react'
import ChangePassword from './ChangePassword'
import ChangeName from './ChangeName'
import './Profile.sass'

function Profile(props) {

    const [view, setView] = useState(null)

    const handleChangeNameClick = () => setView('changeName')
    const handleChangePasswordClick = () => setView('changePassword')

    return <div className="Profile">
        <button className="Profile__changeName" onClick={handleChangeNameClick}>Change Name</button>
        <button className="Profile__changePassword" onClick={handleChangePasswordClick}>Change Password</button>

        {view === 'changeName' && <ChangeName handleRetriveUser={props.handleRetriveUser}/>}
        {view === 'changePassword' && <ChangePassword username={props.username} />}

    </div>
}

export default Profile;