const express = require('express')
const router = express.Router()

const {protact} = require('../middleware/authMiddleware')
const {
    registerUser,
    loginUser,
    getMe,
    changePassword
} = require('../controllers/userController')


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protact , getMe)
router.post('/change',protact , changePassword)


module.exports = router
