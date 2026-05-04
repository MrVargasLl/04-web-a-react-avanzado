import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
const app = express()

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



app.get("/", (req, res) => {
    res.send("Hola mundo server corriendo")
})

app.get( "/peliculas", (req, res) => {
    const data = readData()
    res.json(data)
})


app.listen(PORT, () => {
    console.log(`El server está escuchando el puerto http://localhost:${PORT}`)
})
