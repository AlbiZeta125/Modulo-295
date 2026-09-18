import { connection } from "../database.js"

export async function createConversation(nome) {

    const [result] = await connection.query(
        `INSERT INTO conversations (nome)
         VALUES (?)`,
        [nome]
    )

    return result
}

export async function addMember(idConversazione, idUtente) {

    const [result] = await connection.query(
        `INSERT INTO conversation_members (idConversazione, idUtente)
         VALUES (?, ?)`,
        [idConversazione, idUtente]
    )

    return result
}

export async function getMembers(idConversazione) {

    const [members] = await connection.query(
        `SELECT users.idUtente,
                users.username,
                users.first_name,
                users.last_name,
                users.profile_image,
                users.visibility
         FROM conversation_members
         JOIN users
            ON conversation_members.idUtente = users.idUtente
         WHERE conversation_members.idConversazione = ?`,
        [idConversazione]
    )

    return members
}

export async function getUserConversations(idUtente) {

    const [conversations] = await connection.query(
        `SELECT conversations.*
         FROM conversations
         JOIN conversation_members
            ON conversations.idConversazione = conversation_members.idConversazione
         WHERE conversation_members.idUtente = ?
         ORDER BY conversations.dataCreazione DESC`,
        [idUtente]
    )

    return conversations
}

export async function removeMember(idConversazione, idUtente) {

    const [result] = await connection.query(
        `DELETE FROM conversation_members
         WHERE idConversazione = ? AND idUtente = ?`,
        [idConversazione, idUtente]
    )

    return result
}