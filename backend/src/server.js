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

app.post("/api/chat", async (req, res) => {
    const { prompt } = req.body
    try {
    const response = await generateFromOllama(prompt)
    res.json( {response} )
    } catch (error) {
    console.error("Error en el servidor:", error.message)
    res.status(500).json({error: "Error procesando la solicitud"})
    }
})

/*
{
  "prompt": "Hola!"
}
*/

//POST: Agrega nuevos mensajes    "Agrega": Unknown word.
app.post( "/api/messages", async (req, res) => {

    const { text, sender } = req.body

    if(!text || !sender){
    return res.status(400).json( {error: "Campos incompletos"} )
}
const newMessage = {
    id: Date.now(),
    text,
    sender,
    timestamp: new Date().toISOString()
}

await db.read()
db.data.messages.push(newMessage)
await db.write()

res.status(201).json(newMessage)



} )


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
