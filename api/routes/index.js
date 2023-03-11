const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const validate = require('../middlewares/validation')
const validators = require('../validations/auth')

router.post('/login', validate(validators.login), UserController.postLogin)
router.post('/logout', UserController.postLogout)

module.exports = router
