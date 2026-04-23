
const express = require("express")
const logger = require("./middleware/logger")
const { users } = require("./data")

const app = express()

const PORT = 3000

app.use(logger)
app.use(express.json())



//Crear una ruta básica (endpoint) en la raíz que corresponde al home //post enviar  informacion

app.get( "/users", (req, res) => {
    res.json(users)
})

app.post( "/users", (req, res) => {
    const { name } = req.body


if(!name){
    return res.status(400).json({message: "El nombre es obligatorio"})
}


const newUser = {
    id: users.length + 1,
    name
}

users.push(newUser)
res.status(201).json(newUser)
} )

app.delete("/users/:id", (req, res) => {

    const id = parseInt( req.params.id )

    const index = users.findIndex( u => u.id === id )

    if( index === -1 ){
        return res.status(404).json({message: "Usuario no encontrado"})
        }

    const deleted = users.splice(index,1)
    
    res.json( deleted[0] )





})




app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
}  )



