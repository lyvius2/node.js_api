const express = require('express')
const router = express.Router()
const ctrl = require('./user.ctrl')

router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
// delete todo
router.delete('/:id', ctrl.destroy)
// post todo, req.body를 사용하기 위해서는 body-parser라는 middleware를 추가해야 함
router.post('/', ctrl.create)

module.exports = router