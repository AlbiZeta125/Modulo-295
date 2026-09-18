import express from "express"
import { blockUser, unblockUser, isBlocked } from "../utils/block_utils.js"

const router = express.Router()

router.post("/users/:idBloccato/block", async (request, response) => {

    const idBloccato = request.params.idBloccato
    const dati = request.body

    const risultato = await blockUser(
        dati.idBloccante,
        idBloccato
    )

    response.send(risultato)
})

router.delete("/users/:idBloccato/block", async (request, response) => {

    const idBloccato = request.params.idBloccato
    const dati = request.body

    const risultato = await unblockUser(
        dati.idBloccante,
        idBloccato
    )

    response.send(risultato)
})

router.get("/users/:idUtente1/blocked/:idUtente2", async (request, response) => {

    const idUtente1 = request.params.idUtente1
    const idUtente2 = request.params.idUtente2

    const blocked = await isBlocked(
        idUtente1,
        idUtente2
    )

    response.send({ blocked: blocked })
})

export { router }