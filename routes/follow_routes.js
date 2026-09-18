import express from "express"
import { followUser, unfollowUser, getFollowers, getFollowing, followTag, unfollowTag, getFollowedTags } from "../utils/follow_utils.js"

const router = express.Router()

router.post("/users/:idSeguito/follow", async (request, response) => {

    const idSeguito = request.params.idSeguito
    const dati = request.body

    const risultato = await followUser(
        dati.idFollower,
        idSeguito
    )

    response.send(risultato)
})

router.delete("/users/:idSeguito/follow", async (request, response) => {

    const idSeguito = request.params.idSeguito
    const dati = request.body

    const risultato = await unfollowUser(
        dati.idFollower,
        idSeguito
    )

    response.send(risultato)
})

router.get("/users/:idSeguito/followers", async (request, response) => {

    const idSeguito = request.params.idSeguito

    const followers = await getFollowers(idSeguito)

    response.send(followers)
})

router.get("/users/:idFollower/following", async (request, response) => {

    const idFollower = request.params.idFollower

    const following = await getFollowing(idFollower)

    response.send(following)
})

router.post("/tags/:idTag/follow", async (request, response) => {

    const idTag = request.params.idTag
    const dati = request.body

    const risultato = await followTag(
        dati.idUtente,
        idTag
    )

    response.send(risultato)
})

router.delete("/tags/:idTag/follow", async (request, response) => {

    const idTag = request.params.idTag
    const dati = request.body

    const risultato = await unfollowTag(
        dati.idUtente,
        idTag
    )

    response.send(risultato)
})

router.get("/users/:idUtente/tags", async (request, response) => {

    const idUtente = request.params.idUtente

    const tags = await getFollowedTags(idUtente)

    response.send(tags)
})

export { router }