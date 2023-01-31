const asyncHandler = require('express-async-handler')

const db = require('../config/db')


// add new subject
const newSubject = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    if (!name || !description) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    const [newSubject] = await db.query('INSERT INTO subjects (subjects.name, subjects.description) VALUES (?,?);',
        [
           name,
           description
        ])

    if (newSubject && newSubject.affectedRows > 0) {
        res.status(200).json({
            name,
            description
        })
    } else {
        res.status(500)
        throw new Error('Server Error')
    }
})

// get all subjects
const getAllsubjects = asyncHandler(async (req, res) => {

    const [result] = await db.query('SELECT * FROM subjects ORDER BY createdAt DESC;', [req.user.user_name])

    res.status(200).json(result)
})



module.exports = {
    newSubject,
    getAllsubjects
}