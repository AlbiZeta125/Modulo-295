import { connection } from "../database.js"

export async function blockUser(idBloccante, idBloccato) {

    const [result] = await connection.query(
        `INSERT INTO blocks (idBloccante, idBloccato)
         VALUES (?, ?)`,
        [idBloccante, idBloccato]
    )

    return result
}

export async function unblockUser(idBloccante, idBloccato) {

    const [result] = await connection.query(
        `DELETE FROM blocks
         WHERE idBloccante = ? AND idBloccato = ?`,
        [idBloccante, idBloccato]
    )

    return result
}

export async function isBlocked(idUtente1, idUtente2) {

    const [result] = await connection.query(
        `SELECT *
         FROM blocks
         WHERE (idBloccante = ? AND idBloccato = ?)
            OR (idBloccante = ? AND idBloccato = ?)`,
        [idUtente1, idUtente2, idUtente2, idUtente1]
    )

    return result.length > 0
}