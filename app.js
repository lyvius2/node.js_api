const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
let users = [
    {id: 1, name: 'Alice'}, 
    {id: 2, name: 'Bek'}, 
    {id: 3, name: 'Chris'}
]    // todo

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)
    if (Number.isNaN(limit)) {
        res.status(400).send('Bad Request!')
    } else {
        res.json(users.slice(0, limit))
    }
})
app.get('/users/:id', (req, res) => {
    // id 값을 얻어낸다.
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).send('Bad Request!')
    }
    // users 배열 조회
    const user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(404).send('Not Exist Data!')
    }
    // 응답: res
    res.json(user)
})
// delete todo
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).send('Bad Request!')
    }
    users = users.filter(user => user.id !== id)
    res.status(204).send()
})
// post todo, req.body를 사용하기 위해서는 body-parser라는 middleware를 추가해야 함
app.post('/users', (req, res) => {
    const name = req.body.name
    if (!name) return res.status(400).send('Bad Request')
    /*
    if (users.filter(user => user.name === name)[0]) {
        return res.status(409).send('Exist Name.')
    }
    */
    const found = users.filter(user => user.name === name).length
    if (found) return res.status(409).send('Exist Name.')
    
    const id = Date.now()
    const user = {id, name}
    users.push(user)
    res.status(201).json(user)
})


module.exports = app