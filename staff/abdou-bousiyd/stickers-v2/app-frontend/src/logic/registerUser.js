import Apium from '../vendor/Apium'


export default function registerUser(name, username, password, callback) {

    const api = new Apium

    const url = 'https://b00tc4mp.herokuapp.com/api/v2/users'

    api.call('POST', url, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password })
    }, (error, response) => {
        if(error) {
            callback(error)
            return
        }
        const { status, payload } = response
        if(status === 201) {
            callback(null)
        }else if (status >= 400 && status < 500) {       
                const data = JSON.parse(payload)
    
                callback(new Error(data.error))
            }  else callback(new Error('server error'))
    })
}