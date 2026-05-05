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

app.post("/api/chat", async (req, res) => {

    const { prompt } = req.body

    try {
        const response = await generateFromOllama(prompt)
        res.json({ response })
    } catch (error) {
        console.error("Error en el servidor:", error.message)
        res.status(500).json({ error: "Error procesando la solicitud" })
    }




})



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
