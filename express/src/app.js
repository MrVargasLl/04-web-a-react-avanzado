

//Manejo de variables de entorno con Node.js
//node--env-file=.env app.js
/* "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/app.js",
    "dev": "nodemon --env-file=.env src/app.js"
    },
 */

/*   //Variables de entorno
console.log(process.env.PORT)
console.log(process.env.HELLO) */
/* console.log(infoPeliculas); */

import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { infoPeliculas } from './peliculas.js'
config()

const app = express()
app.use( cors())
app.use(express.json())

//Ruta raiz
app.get("/", (req, res) => {
    res.send("Servidor de express corriendo...")
})

//Recursos generales

app.get("/api/peliculas", (req, res) => {
    res.send(infoPeliculas)
})

//localhost:5000/api/peliculas?year=2023?dire

/* Accion */

app.get("/api/peliculas/accion", (req, res) => {
    res.send(infoPeliculas.accion)
})

/* Drama */

app.get("/api/peliculas/drama", (req, res) => {
    res.send(infoPeliculas.drama)
})

//Rutas mas especificas
app.get("/api/peliculas/accion/titulo/:titulo/:year", (req, res) => {

    const { titulo, year } = req.params

    const resultados = infoPeliculas.accion.filter(
        pelicula => pelicula.titulo === titulo && pelicula.year === Number(year)
    )

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados para ${titulo} y ${year}`)
    }

    res.send(resultados)
})

app.get("/api/peliculas/accion/year/:year", (req, res) => {

    const year = Number(req.params.year)

    const resultados = infoPeliculas.accion.filter(pelicula => pelicula.year === year)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados de ${year}`)
    }

    res.send(resultados)
})

//Parámetros query:

// http://localhost:5000/api/peliculas/accion/titulo?ordenar=year

// http://localhost:5000/api/peliculas/accion/pais/colombia?ordenar=year
app.get("/api/peliculas/accion/pais/:pais", (req, res) => {

    const pais = req.params.pais
    const resultados = infoPeliculas.accion.filter(pelicula => pelicula.pais === pais)

    if (req.query.ordenar === "year") {
    return res.send(resultados.sort((a, b) => b.year - a.year))
}

res.send(resultados)


})

app.get("/api/peliculas/accion/:titulo", (req, res) => {

    const titulo = req.params.titulo
    const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados para ${titulo}`)
    }


    console.log(req.query.ordenar)
    res.send(resultados)
})

app.get("/api/peliculas/drama/:titulo", (req, res) => {

    const titulo = req.params.titulo
    const resultados = infoPeliculas.drama.filter(pelicula => pelicula.titulo === titulo)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados para ${titulo}`)
    }

    res.send(resultados)
})


/* POST */

app.post("/api/peliculas", (req, res) => {

    const nuevaPelicula = req.body

    const { titulo, director, year, pais, genero } = nuevaPelicula
    if (!titulo || !director || !year || !pais || !genero) {
    return res.status(400).send({
    error: "Faltan datos obligatorios"
        })
}

if (!infoPeliculas[genero]) {
    res.status(400).send({
    error: `El género ${genero} no existe`
    })
}

// Generar un nuevo ID
const nuevoId = infoPeliculas[genero].length > 0
    ? infoPeliculas[genero][infoPeliculas[genero].length - 1].id + 1
    : 1

    const peliculaFinal = {
id: nuevoId,
titulo,
director,
year: Number(year),
pais,
visitas: nuevaPelicula.visitas || 0
}

// Guardar en la base de datos peliculas.js
infoPeliculas[genero].push(peliculaFinal)

console.log("Pelicula guardada: ", peliculaFinal)

    res.status(201).send({
    mensaje: "Película recibida con éxito",
    datos: peliculaFinal
    })

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`El servidor está escuchando el puerto http://localhost:${PORT}`)
})


