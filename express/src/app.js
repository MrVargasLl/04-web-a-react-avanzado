

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
import { infoPeliculas } from './peliculas.js'
config() 

const app = express()

app.get("/", (req, res) => {
    res.send("Servidor de express corriendo...")
})

app.get("/api/peliculas", (req, res) => {
    res.send(infoPeliculas)
})

//localhost:5000/api/peliculas?year=2023?dire
/* Accion */

app.get("/api/peliculas/accion", (req, res) => {
    res.send(infoPeliculas.accion)
}) 

app.get("/api/peliculas/accion/:titulo", (req, res) => {

    const titulo = req.params.titulo
    const resultados = infoPeliculas.accion.filter( pelicula => pelicula.titulo === titulo )

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados para ${titulo}`)
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

/* Drama*/

app.get("/api/peliculas/drama", (req, res) => {
    res.send(infoPeliculas.drama)
})

app.get("/api/peliculas/drama/:titulo", (req, res) => {

    const titulo = req.params.titulo
    const resultados = infoPeliculas.drama.filter( pelicula => pelicula.titulo === titulo )

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron resultados para ${titulo}`)
}

    res.send(resultados)
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`El servidor está escuchando el puerto http://localhost:${PORT}`)
})


