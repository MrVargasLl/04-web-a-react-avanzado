import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hola mundo server corriendo")
})

app.listen(PORT, () => {
    console.log(`El server está escuchando el puerto http://localhost:${PORT}`)
})
