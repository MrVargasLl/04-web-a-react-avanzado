import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'

const app = express()

const PORT = 3001

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hola Ollama ")
})

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
