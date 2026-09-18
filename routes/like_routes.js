import express from "express"
import { addLike, removeLike, getLikesCount,  addCommentLike, removeCommentLike, getCommentLikesCount } from "../utils/like_utils.js"

const router = express.Router()

router.post("/posts/:idPost/likes", async (request, response) => {

    const idPost = request.params.idPost
    const dati = request.body

    const risultato = await addLike(
        idPost,
        dati.idUtente
    )

    response.send(risultato)
})

router.delete("/posts/:idPost/likes", async (request, response) => {

    const idPost = request.params.idPost
    const dati = request.body

    const risultato = await removeLike(
        idPost,
        dati.idUtente
    )

    response.send(risultato)
})

router.get("/posts/:idPost/likes", async (request, response) => {

    const idPost = request.params.idPost

    const risultato = await getLikesCount(idPost)

    response.send(risultato)
})

router.post("/comments/:idCommento/likes", async (request, response) => {

    const idCommento = request.params.idCommento
    const dati = request.body

    const risultato = await addCommentLike(
        idCommento,
        dati.idUtente
    )

    response.send(risultato)
})

router.delete("/comments/:idCommento/likes", async (request, response) => {

    const idCommento = request.params.idCommento
    const dati = request.body

    const risultato = await removeCommentLike(
        idCommento,
        dati.idUtente
    )

    response.send(risultato)
})

router.get("/comments/:idCommento/likes", async (request, response) => {

    const idCommento = request.params.idCommento

    const risultato = await getCommentLikesCount(idCommento)

    response.send(risultato)
})

export { router }