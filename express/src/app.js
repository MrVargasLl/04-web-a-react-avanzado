

//Manejo de variables de entorno con Node.js
//node--env-file=.env app.js
/* "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/app.js",
    "dev": "nodemon --env-file=.env src/app.js"
    },
 */

 import { config } from 'dotenv'
config() 

//Variables de entorno
console.log(process.env.PORT)
console.log(process.env.HELLO)

