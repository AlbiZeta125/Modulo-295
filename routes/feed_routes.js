import express from "express"
import { getRecentPosts, getPopularPosts, getForYouPosts } from "../utils/feed_utils.js"

const router = express.Router()

router.get("/feed/recent", async (request, response) => {

    const posts = await getRecentPosts()

    response.send(posts)
})

router.get("/feed/popular", async (request, response) => {

    const posts = await getPopularPosts()

    response.send(posts)
})

router.get("/feed/for-you/:idUtente", async (request, response) => {

    const idUtente = request.params.idUtente

    const posts = await getForYouPosts(idUtente)

    response.send(posts)
})

export { router }