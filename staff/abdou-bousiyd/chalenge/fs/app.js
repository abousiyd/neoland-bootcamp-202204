var fs = require('fs')

function retriveText(callback) {
    fs.readFile('./text.txt', 'utf8', function(err, data) {
        if(err) throw err

        callback(data)
    })
}
// retriveText()

var data = fs.readFileSync('./text.txt', 'utf8')
console.log(data)