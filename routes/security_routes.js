import express from "express"

import { loginUser, isAuthenticated } from "../utils/auth_utils.js"

const router = express.Router()

router.post("/login", async (request, response) => {

    const dati = request.body

    const user = await loginUser(
        dati.username,
        dati.password
    )

    if (user === null) {
        return response.status(401).send("Username o password errati")
    }

    request.session.user = user.username
    request.session.user_id = user.idUtente

    response.send("Login effettuato")
})

router.get("/session", async (request, response) => {

    response.send({
        user: request.session.user,
        user_id: request.session.user_id,
        isLoggedIn: response.locals.isLoggedIn
    })
})

router.get("/logout", isAuthenticated, async (request, response) => {

    request.session.destroy()

    response.send("Logout effettuato")
})


export {router}