import express from "express"
import { sendMessage, getMessages, deleteMessage } from "../utils/message_utils.js"

const router = express.Router()

router.post("/conversations/:idConversazione/messages", async (request, response) => {

    const idConversazione = request.params.idConversazione
    const dati = request.body

    const risultato = await sendMessage(
        idConversazione,
        dati.idUtente,
        dati.contenuto
    )

    response.send(risultato)
})

router.get("/conversations/:idConversazione/messages", async (request, response) => {

    const idConversazione = request.params.idConversazione

    const messages = await getMessages(idConversazione)

    response.send(messages)
})

router.delete("/messages/:idMessaggio", async (request, response) => {

    const idMessaggio = request.params.idMessaggio

    const risultato = await deleteMessage(idMessaggio)

    response.send(risultato)
})

export { router }