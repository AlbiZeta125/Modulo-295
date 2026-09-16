import express from "express"
import { getAllTags, createTag, addTagToPost, getTagsByPost, removeTagFromPost } from "../utils/tag_utils.js"

const router = express.Router()

router.get("/tags", async (request, response) => {

    const tags = await getAllTags()

    response.send(tags)
})

router.post("/tags", async (request, response) => {

    const dati = request.body

    const risultato = await createTag(dati.nome)

    response.send(risultato)
})

router.post("/posts/:idPost/tags/:idTag", async (request, response) => {

    const idPost = request.params.idPost
    const idTag = request.params.idTag

    const risultato = await addTagToPost(idPost, idTag)

    response.send(risultato)
})

router.get("/posts/:idPost/tags", async (request, response) => {

    const idPost = request.params.idPost

    const tags = await getTagsByPost(idPost)

    response.send(tags)
})

router.delete("/posts/:idPost/tags/:idTag", async (request, response) => {

    const idPost = request.params.idPost
    const idTag = request.params.idTag

    const risultato = await removeTagFromPost(idPost, idTag)

    response.send(risultato)
})

export { router }