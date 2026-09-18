import express from "express"
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../utils/post_utils.js"
import { addTagToPost } from "../utils/tag_utils.js"

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

    if (!dati.idTag) {
        return response.status(400).send("Devi inserire almeno un tag")
    }

    const risultato = await createPost(
        request.session.user_id,
        dati.contenuto,
        dati.immagine
    )

    await addTagToPost(
        risultato.insertId,
        dati.idTag
    )

    response.send(risultato)
})

router.delete("/posts/:id", async (request, response) => {

    const id = request.params.id

    const risultato = await deletePost(
        id,
        request.session.user_id
    )

    response.send(risultato)
})

export { router }