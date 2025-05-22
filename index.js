import express from 'express'
const app = express()
const PORT = 5000

import account from './routes/accountRoute.js'

app.use(express.json())

app.use(account)

app.listen(PORT, () => {
    console.log(`El servidor se inicializo en el puerto ${PORT}`)
})