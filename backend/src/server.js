import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'
import db from './db.js'


const app = express()

const PORT = 3001

app.use( cors() )

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hola Ollama ")
})


//GET: Obtener mensajes
app.get( "/api/messages", async (req, res) => {
    await db.read()
    res.json(db.data.messages)
    res.send("Mostrando mensajes...")

} )

/* //GET: Obtener mensajes
app.get( "/api/messages", async (req, res) => {
  await db.read()
  res.json(db.data.messages)
}) */



/*
{
  "prompt": "Hola!"
}
*/

//POST: Agrega nuevos mensajes    "Agrega": Unknown word.
app.post( "/api/messages", async (req, res) => {

    const { text, sender } = req.body


} )


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
