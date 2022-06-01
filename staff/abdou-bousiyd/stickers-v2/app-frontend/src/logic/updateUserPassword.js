import Apium from "../vendor/Apium"

export default function updateUserPassword(token, oldPassword, password, newPasswordRepeat, callback) {

    const api = new Apium
    const url = 'https://b00tc4mp.herokuapp.com/api/v2/users'

    api.call(
        'PATCH',
        url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
        },
            body: JSON.stringify({ oldPassword, password })
        }, 
            (error, {status, payload}) => {
            if(error) return callback(error)
            if(status === 204) {
                callback(null)
            }else if (status >= 400 && status < 500) {
                const data = JSON.parse(payload)
                callback(new Error(data.error))
            } else callback(new Error('server error'))
    })
}


