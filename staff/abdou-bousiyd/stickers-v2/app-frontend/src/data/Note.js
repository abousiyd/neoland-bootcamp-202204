import createId from "../utils/createId"

function Note(username, text, date, id) {
    
    this.username = username
    this.text = text
    this.date = date || new Date
    this.id = id || createId()
}

export default Note