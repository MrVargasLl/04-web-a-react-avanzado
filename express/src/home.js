import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT

//Función que lee la información de peliculas.json
const readData = () => {
    try {
        const data = fs.readFileSync('./src/peliculas.json')
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
    }
}

//Función que escribe dentro del archivo de peliculas.json
const writeData = (data) => {
    try {
        fs.writeFileSync('./src/peliculas.json', JSON.stringify(data))
    } catch (error) {
        console.error(error)
    }
}

//POST
app.post("/peliculas", (req, res) => {

    const data = readData()
    const body = req.body

    const newMovie = {
        id: data.accion.length + 1,
        ...body
    }

    data.accion.push(newMovie)


    writeData(data)

    res.json(newMovie)

})


//PUT
app.put("/peliculas/:id", (req, res) => {
    const data = readData()
    const body = req.body

    const id = parseInt(req.params.id)

    const peliculaIndex = data.accion.findIndex(movie => movie.id === id)

    data.accion[peliculaIndex] = {
        ...data.accion[peliculaIndex],
        ...body
    }
    writeData(data)
    res.json({ message: "Película actualizada con éxito" })

})

//DELETE
app.delete("/peliculas/:id", (req, res) => {
    const data = readData()
    const id = req.params.id

    const peliculaIndex = data.accion.findIndex(movies => movies.id === id)

    data.accion.splice(peliculaIndex -1, 1)

    writeData(data)

    res.json({ message: "Película eliminada con éxito" })

})




app.get("/", (req, res) => {
    res.send("Hola mundo server corriendo")
})

app.get("/peliculas", (req, res) => {
    const data = readData()
    res.json(data)
})


app.listen(PORT, () => {
    console.log(`El server está escuchando el puerto http://localhost:${PORT}`)
})
