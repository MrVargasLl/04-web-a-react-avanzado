//Cargar el módulo nativo "http" de Node.js
const http = require('http')




//Creamos el servidor, responde a las solicitudes del navegador
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("Hola mundo desde Node.js")
})




//Función que escuche en el puerto 3000
server.listen(3000, () => {
    console.log("Servidor ejecutándose en: http://localhost:3000")
})