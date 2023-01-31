const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const db = require('../config/db')


const protact = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get the token
            token = req.headers.authorization.split(' ')[1]

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            const [result] = await db.query(
                'SELECT id, name, user_name, email, date_of_birth ,about, createdAt, editedAt FROM users WHERE id = ?;',
                 [decoded.id])
           if(result.length > 0){
               req.user = result[0]
               next()
           }else{
            res.status(401)
            throw new Error('NOT authorized')
           }

        } catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('NOT authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('NOT authorized, no token')
    }
})

const protactAdmin = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get the token
            token = req.headers.authorization.split(' ')[1]

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            const [result] = await db.query(
                'SELECT id, name, user_name, email, date_of_birth ,about, role, createdAt, editedAt FROM users WHERE id = ?;',
                 [decoded.id])
           if(result.length > 0 && result[0].role === 'admin'){
               req.user = result[0]
               next()
           }else{
            res.status(401)
            throw new Error('NOT authorized')
           }

        } catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('NOT authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('NOT authorized, no token')
    }
})


module.exports = { protact , protactAdmin}