import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import { router as userRoutes } from "./routes/user_routes.js"
import { router as securityRoutes } from "./routes/security_routes.js";

import { router as postRoutes } from "./routes/post_routes.js"

import { router as tagRoutes } from "./routes/tag_routes.js"

import { router as commentRoutes } from "./routes/comment_routes.js"

import { router as likeRoutes } from "./routes/like_routes.js"

import { router as followRoutes } from "./routes/follow_routes.js"

import { router as feedRoutes } from "./routes/feed_routes.js"

import { router as blockRoutes } from "./routes/block_routes.js"

import { router as conversationRoutes } from "./routes/conversation_routes.js"

import { router as messageRoutes } from "./routes/message_routes.js"



const app = express() 
dotenv.config()

const PORT = process.env.PORT

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *60 * 3 
        // 3 ore
    }
}))

app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.user
    res.locals.username = req.session.user || null
    res.locals.user_id = req.session.user_id || null
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("", userRoutes)
app.use("", postRoutes)
app.use("", tagRoutes)
app.use("", commentRoutes)
app.use("", likeRoutes)
app.use("", followRoutes)
app.use("", feedRoutes)
app.use("", blockRoutes)
app.use("", conversationRoutes)
app.use("", messageRoutes)
app.use("", securityRoutes)
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