var fs = require('fs')

fs.watch('./', function(eventType, filename) {
    console.log('tipo de evento: ' + eventType)

    if(filename) {
        console.log('archivo proveido: ' + filename)
    }else {
        console.log('archivo no proporcionado')
    }
})