const { Component } = React

class Register extends Component {

    handleFormSubmit = e => {
        e.preventDefault()

        const name = e.target.name.value
        const username = e.target.username.value
        const password = e.target.password.value
        
        registerUser(name, username, password, error => {
            if (error) {
                alert(error.message)

                return
            }

            this.props.onUserLoggedOut()
        })
    }

    handleLoginLinkClick = e => {
        e.preventDefault()

        this.props.onUserLoggedOut()

    }

    render() {
        return<div>
            <form className="Container" onSubmit={this.handleFormSubmit}>
                <input className="Input Input--light" type="text" name="name" placeholder="name" />
                <input className="Input Input--light" type="text" name="username" placeholder="username" />
                <input className="Input Input--light" type="password" name="password" placeholder="password" />
                <button className="Button Button--light">Register</button>
                <a href="#" onClick={this.handleLoginLinkClick}>Login</a>
            </form>
        </div>
    }

    // onUserRegistered(callback) {
    //     const form = this.container.querySelector('form')

    //     form.addEventListener('submit', function (event) {
    //         event.preventDefault()

    //         const name = form.name.value
    //         const username = form.username.value
    //         const password = form.password.value

    //         //callback(name, username, password)

    //     })
    // }

    // onLoginClick(callback) {
    //     const anchor = this.container.querySelector('a')

    //     anchor.addEventListener('click', function (event) {
    //         event.preventDefault()

    //         callback()
    //     })
    // }
}