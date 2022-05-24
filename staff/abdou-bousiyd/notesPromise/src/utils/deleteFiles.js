const { readdir, unlink } = require('fs')

function deleteFiles(folder, callback) {
    readdir(folder, (error, files) => {
        if (error) return callback(error)

        let count = 0, _error

        if (files.length)
            files.forEach(file => {
                unlink(`${folder}/${file}`, error => {
                    if (!_error) {
                        if (error) return callback(_error = error)

                        count++

                        if (count === files.length)
                            callback(null)
                    }
                })
            })
        else
            callback(null)
    })
}

module.exports = deleteFiles