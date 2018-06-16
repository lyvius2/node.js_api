let users = [
    {id: 1, name: 'Alice'}, 
    {id: 2, name: 'Bek'}, 
    {id: 3, name: 'Chris'}
]    // todo

const index = (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)
    if (Number.isNaN(limit)) {
        res.status(400).send('Bad Request!')
    } else {
        res.json(users.slice(0, limit))
    }
}
const show = (req, res) => {
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
}
const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).send('Bad Request!')
    }
    users = users.filter(user => user.id !== id)
    res.status(204).send()
}
const create = (req, res) => {
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
}

module.exports = {
    index,
    show,
    destroy,
    create
}