const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const db = require('../config/db')

//@desc      Register user
//@route     POST /api/users
//@access    Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, userName, email, password, birthday, about } = req.body
    if (!name || !userName || !email || !password || !birthday) {
        res.status(400)
        throw new Error('Please complete all fields')
    }


    //check if user exist
    const [result] = await db.query('SELECT * FROM users WHERE email=?', [email])

    if (result.length > 0) {
        res.status(400)
        throw new Error('User already exist')
    }
    const [result2] = await db.query('SELECT * FROM users WHERE user_name=?', [userName])

    if (result2.length > 0) {
        res.status(400)
        throw new Error('User already exist')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const [newUser] = await db.query("INSERT INTO users (name ,user_name, email, password, date_of_birth, about) VALUES(?,?,?,?,?,?);", [
        name,
        userName,
        email,
        hashedPassword,
        birthday,
        about
    ])


    if (newUser && newUser.affectedRows > 0) {
        res.status(200).json({
            id: newUser.insertId,
            name,
            userName,
            email,
            birthday,
            about,
            token: generateToken(newUser.insertId)
        })
    } else {
        res.status(500)
        throw new Error('Server Error')
    }

})


//@desc      Auth user
//@route     POST /api/users/login
//@access    Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    //check if user exist
    const [result] = await db.query('SELECT * FROM users WHERE email=? LIMIT 1;', [email])

    if (result.length > 0 && (await bcrypt.compare(password,
        result[0].password))) {
        res.status(200).json({
            id: result[0].id,
            name: result[0].name,
            userName: result[0].user_name,
            email,
            birthday: result[0].date_of_birth,
            about: result[0].about,
            token: generateToken(result[0].id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid')
    }

})

//@desc      Get user data
//@route     GET /api/users/me
//@access    Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})



//Generate JWT TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


// change password
const changePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        res.status(400)
        throw new Error('Please complete all fields')
    }


    //check if password is currect
    const [result] = await db.query('SELECT * FROM users WHERE id=?', [req.user.id])

    if (result.length > 0 && (await bcrypt.compare(oldPassword,
        result[0].password))) {
        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        const [result2] = await db.query('UPDATE users SET password=? WHERE id=?;', [hashedPassword, req.user.id])

        if (result2 && result2.affectedRows > 0) {
            res.status(200).json({
                message: 'passwored updated'
            })
        } else {
            res.status(500)
            throw new Error('Server Error')
        }

    } else {
        res.status(401)
        throw new Error('Invalid')
    }



})


module.exports = {
    registerUser,
    loginUser,
    getMe,
    changePassword
}