const express = require('express')
const router = express.Router()

const {protact} = require('../middleware/authMiddleware')
const {
    getAllMessagesToUser,
    getAllMessagesFromUser,
    newMessage,
    getMessageById,
    setRead
} = require('../controllers/messageController')


router.get('/to',protact , getAllMessagesToUser)
router.get('/from',protact , getAllMessagesFromUser)
router.post('/new', protact, newMessage)
router.get('/message/:id', protact, getMessageById)
router.put('/read', protact, setRead)

module.exports = router

