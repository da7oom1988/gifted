const express = require('express')
require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const subjectRoutes = require('./routes/subjectRoutes')


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/subjects', subjectRoutes)


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))