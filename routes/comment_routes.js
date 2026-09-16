import express from "express"
import { getAllComments, createComment, getCommentsByPost } from "../utils/comment_utils.js"

const router = express.Router()

router.get("/comments", async (request, response) => {

    const comments = await getAllComments()

    response.send(comments)
})

router.post("/comments", async (request, response) => {

    const dati = request.body

    const risultato = await createComment(
        dati.idPost,
        dati.idUtente,
        dati.contenuto,
        dati.idCommentoMain
    )

    response.send(risultato)
})

router.get("/posts/:idPost/comments", async (request, response) => {

    const idPost = request.params.idPost

    const comments = await getCommentsByPost(idPost)

    response.send(comments)
})

export { router }