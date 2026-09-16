import express from "express"
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../utils/post_utils.js"

const router = express.Router()

router.get("/posts", async (request, response) => {

    const posts = await getAllPosts()

    response.send(posts)
})

router.get("/posts/:id", async (request, response) => {

    const id = request.params.id

    const post = await getPostById(id)

    response.send(post)
})

router.post("/posts", async (request, response) => {

    const dati = request.body

    const risultato = await createPost(
        dati.idUtente,
        dati.contenuto,
        dati.immagine
    )

    response.send(risultato)
})

router.put("/posts/:id", async (request, response) => {

    const id = request.params.id
    const dati = request.body

    const risultato = await updatePost(
        id,
        dati.contenuto,
        dati.immagine
    )

    response.send(risultato)
})

router.delete("/posts/:id", async (request, response) => {

    const id = request.params.id

    const risultato = await deletePost(id)

    response.send(risultato)
})

export { router }