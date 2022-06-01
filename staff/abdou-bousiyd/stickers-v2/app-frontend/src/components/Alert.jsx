import './Alert.sass'

function Alert (props){
    const {message, error} = props;

    return <div className="alert ">
            { error && <span className="material-icons"  >warning</span>}
            <span className="alert-text">{message}</span>
        </div>
}

export default Alert;