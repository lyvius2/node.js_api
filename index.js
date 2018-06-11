const fs = require('fs')

const callback = (err, data) => {
    console.log(data)
}

const file = fs.readFile('test.txt', {encoding: 'UTF-8'}, callback)

//console.log(file)