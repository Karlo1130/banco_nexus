import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import account from './routes/accountRoute.js'

// Setup path utilities
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

// Middleware para JSON
app.use(express.json())

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, './frontend')))

// Rutas API
app.use(account)

// Ruta por defecto (cuando alguien visita "/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'))
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`El servidor se inicializó en el puerto ${PORT}`)
})
