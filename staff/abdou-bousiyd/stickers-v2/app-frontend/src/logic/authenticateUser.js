
import Apium from '../vendor/Apium'


export default function authenticateUser(username, password, callback) {
    const api = new Apium

    api.call('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }, (error, { status, payload }) => {
        if (error) {
            callback(error)
            return
        }

        if (status === 200) {
            const data = JSON.parse(payload)

            callback(null, data.token)
        } else if (status >= 400 && status < 500) {
            const data = JSON.parse(payload)

            callback(new Error(data.error))
        } else {
            callback(new Error('server error'))
        }
    })
}