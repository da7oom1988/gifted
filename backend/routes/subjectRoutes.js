const express = require('express')
const router = express.Router()

const {protact, protactAdmin} = require('../middleware/authMiddleware')

const {
    newSubject,
    getAllsubjects
} = require('../controllers/subjectController')


 router.get('/',protact , getAllsubjects)
 router.post('/new', protactAdmin, newSubject)


module.exports = router

