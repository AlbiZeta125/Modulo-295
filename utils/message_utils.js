import { connection } from "../database.js"

export async function sendMessage(idConversazione, idUtente, contenuto) {

    const [result] = await connection.query(
        `INSERT INTO messages (idConversazione, idUtente, contenuto)
         VALUES (?, ?, ?)`,
        [idConversazione, idUtente, contenuto]
    )

    return result
}

export async function getMessages(idConversazione) {

    const [messages] = await connection.query(
        `SELECT *
         FROM messages
         WHERE idConversazione = ?
         ORDER BY dataInvio ASC`,
        [idConversazione]
    )

    return messages
}

export async function deleteMessage(idMessaggio) {

    const [result] = await connection.query(
        `DELETE FROM messages
         WHERE idMessaggio = ?`,
        [idMessaggio]
    )

    return result
}