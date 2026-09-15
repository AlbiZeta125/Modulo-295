import express from "express";
import dotenv from "dotenv";

import { router as userRoutes } from "./routes/user_routes.js"
import { router as securityRoutes } from "./routes/security_routes.js";

const app = express() 
dotenv.config()

const PORT = process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("", userRoutes)

/* Endpoint */
/* 
    app -> Applicazione express
    GET -> Metodo HTTP della richiesta
        GET -> Prendere informazioni / risorse
        POST -> Inserire informazioni
        PUT -> Aggiornare informazioni già esistenti
        DELETE -> Eliminare informazioni

    "/" -> URL della richiesta 
    (request, response) / (req, res)

    response.send("Prova") 
*/

app.get("/", function(request, response) {
    response.send("Modifiche del testo")
})

app.post("/", (request, response) =>{
    const dati = request.body
    response.send(dati)
})

app.post("/:id", (request, response) =>{
    const id = request.params.id
    response.send(id)
})

app.listen(PORT, () => {
    console.log("App avviata all'indirizzo http://localhost:3000")
})