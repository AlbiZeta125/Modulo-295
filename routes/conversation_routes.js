import express from "express"
import { createConversation, addMember, getMembers, getUserConversations, removeMember } from "../utils/conversation_utils.js"

const router = express.Router()

router.post("/conversations", async (request, response) => {

    const dati = request.body

    const risultato = await createConversation(
        dati.nome
    )

    response.send(risultato)
})

router.post("/conversations/:idConversazione/members", async (request, response) => {

    const idConversazione = request.params.idConversazione
    const dati = request.body

    const risultato = await addMember(
        idConversazione,
        dati.idUtente
    )

    response.send(risultato)
})

router.get("/conversations/:idConversazione/members", async (request, response) => {

    const idConversazione = request.params.idConversazione

    const members = await getMembers(idConversazione)

    response.send(members)
})

router.get("/users/:idUtente/conversations", async (request, response) => {

    const idUtente = request.params.idUtente

    const conversations = await getUserConversations(idUtente)

    response.send(conversations)
})

router.delete("/conversations/:idConversazione/members/:idUtente", async (request, response) => {

    const idConversazione = request.params.idConversazione
    const idUtente = request.params.idUtente

    const risultato = await removeMember(
        idConversazione,
        idUtente
    )

    response.send(risultato)
})

export { router }