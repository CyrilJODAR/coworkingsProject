const express = require('express')
const morgan = require('morgan')
const sequelize = require('./db/sequelize')
const path = require('path')
const app = express()
const cors = require('cors')
const port = 3001

sequelize.initDb()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware quand l'url de la requête n'aboutit à rien
app.use((req, res) => {
    res.status(404).json({ message: `L'url demandé n'existe pas.` })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})