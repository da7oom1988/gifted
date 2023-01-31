const asyncHandler = require('express-async-handler')

const db = require('../config/db')

const getAllMessagesToUser = asyncHandler(async (req, res) => {

    const [result] = await db.query('SELECT * FROM messages WHERE messages.to=? ORDER BY createdAt DESC;', [req.user.user_name])

    res.status(200).json(result)
})

const getAllMessagesFromUser = asyncHandler(async (req, res) => {

    const [result] = await db.query('SELECT * FROM messages WHERE messages.from=? ORDER BY createdAt DESC;', [req.user.user_name])

    res.status(200).json(result)
})

const newMessage = asyncHandler(async (req, res) => {

    const { to, title, body } = req.body
    if (!to || !title || !body) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    //check if recever exist
    const [result2] = await db.query('SELECT * FROM users WHERE user_name=?', [to])

    if (result2.length <= 0) {
        res.status(400)
        throw new Error('User Does Not exist')
    }

    const [newMessage] = await db.query('INSERT INTO messages (messages.from, messages.to, message_title, message_body) VALUES (?,?,?,?);',
        [
            req.user.user_name,
            to,
            title,
            body
        ])

    if (newMessage && newMessage.affectedRows > 0) {
        res.status(200).json({
            to, title, body
        })
    } else {
        res.status(500)
        throw new Error('Server Error')
    }

})

//get message by id
const getMessageById = asyncHandler(async (req, res) => {

    const [result] = await db.query('SELECT * FROM messages WHERE id=? AND  (messages.to=? OR messages.from=?);',
     [req.params.id, req.user.user_name, req.user.user_name])

    if (result.length <= 0) {
        res.status(500)
        throw new Error('Server Error')
    }

    res.status(200).json(result[0])
})


//set read 
const setRead = asyncHandler(async (req, res) => {

    const [newMessage] = await db.query('UPDATE messages  SET messages.read=1 WHERE id=?;', [req.body.id])

if (newMessage && newMessage.affectedRows > 0) {
    res.status(200).json({
        to, title, body
    })
} else {
    res.status(500)
    throw new Error('Server Error')
}

})

module.exports = {
    getAllMessagesToUser,
    getAllMessagesFromUser,
    newMessage,
    getMessageById,
    setRead
}