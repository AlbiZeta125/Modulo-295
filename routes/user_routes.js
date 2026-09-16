import express from "express"
import { getAllUtenti, getUserById, createUser, updateUser, deleteUser, 
    getAllComments, createComment, getCommentsByPost, likeComment } from "../utils/user_utils.js"

const router = express.Router()

router.get("/utenti", async (request, response) => {

    const utenti = await getAllUtenti()

    response.send(utenti)
})

router.get("/utenti/:id", async (request, response) => {

    const id = request.params.id

    const utente = await getUserById(id)

    response.send(utente)
})

router.post("/utenti", async (request, response) => {

    const dati = request.body

    const oggi = new Date()
    const nascita = new Date(dati.birth_date)

    let eta = oggi.getFullYear() - nascita.getFullYear()

    if (
    oggi.getMonth() < nascita.getMonth() ||
    (oggi.getMonth() === nascita.getMonth() && oggi.getDate() < nascita.getDate())
) {
    eta--
}

    if (eta < 16) {
    return response.status(400).send("Devi avere almeno 16 anni per registrarti")
}

if (dati.password_hash.length < 8) {
    return response.status(400).send("La password deve avere almeno 8 caratteri")
}

if (!/[A-Z]/.test(dati.password_hash)) {
    return response.status(400).send("La password deve contenere almeno una lettera maiuscola")
}

if (!/[^A-Za-z0-9]/.test(dati.password_hash)) {
    return response.status(400).send("La password deve contenere almeno un carattere speciale")
}

    const risultato = await createUser(
        dati.username,
        dati.first_name,
        dati.last_name,
        dati.email,
        dati.password_hash,
        dati.birth_date,
        dati.nationality
    )

    response.send(risultato)
})

router.put("/utenti/:id", async (request, response) => {

    const id = request.params.id
    const dati = request.body

    const risultato = await updateUser(
        id,
        dati.username,
        dati.first_name,
        dati.last_name,
        dati.email,
        dati.nationality
    )

    response.send(risultato)
})

router.delete("/utenti/:id", async (request, response) => {

    const id = request.params.id

    const risultato = await deleteUser(id)

    response.send(risultato)
})

router.get("/commenti", async (request, response) => {

    const comments = await getAllComments()

    response.send(comments)
})

router.post("/commenti", async (request, response) => {

    const dati = request.body

    const risultato = await createComment(
        dati.idUtente,
        dati.idPost,
        dati.idCommentoMain,
        dati.contenuto
    )

    response.send(risultato)
})

router.get("/commenti/post/:idPost", async (request, response) => {

    const idPost = request.params.idPost

    const comments = await getCommentsByPost(idPost)

    response.send(comments)
})

router.post("/commenti/like", async (request, response) => {

    const dati = request.body

    const risultato = await likeComment(
        dati.idUtente,
        dati.idCommento
    )

    response.send(risultato)
})

export {router}