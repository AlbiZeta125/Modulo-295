import express from "express"
import { getAllComments, createComment, getCommentsByPost, updateComment, deleteComment, getRepliesByComment } from "../utils/comment_utils.js"

const router = express.Router()

router.get("/comments", async (request, response) => {

    const comments = await getAllComments()

    response.send(comments)
})

router.post("/comments", async (request, response) => {

    if (!request.session.user_id) {
        return response.status(401).send("Devi effettuare il login")
    }

    const dati = request.body

    const risultato = await createComment(
        dati.idPost,
        request.session.user_id,
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

router.put("/comments/:id", async (request, response) => {

    const id = request.params.id
    const dati = request.body

    const risultato = await updateComment(
        id,
        dati.contenuto
    )

    response.send(risultato)
})

router.delete("/comments/:id", async (request, response) => {

    const id = request.params.id

    const risultato = await deleteComment(
        id,
        request.session.user_id
    )

    response.send(risultato)
})  

router.get("/comments/:id/replies", async (request, response) => {

    const id = request.params.id

    const replies = await getRepliesByComment(id)

    response.send(replies)
})


export { router }