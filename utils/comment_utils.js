import { connection } from "../database.js"

export async function getAllComments() {

    const [comments] = await connection.query(
        "SELECT * FROM comments"
    )

    return comments
}

export async function createComment(idPost, idUtente, contenuto, idCommentoMain) {

    const [result] = await connection.query(
        `INSERT INTO comments
        (idPost, idUtente, contenuto, idCommentoMain)
        VALUES (?, ?, ?, ?)`,
        [idPost, idUtente, contenuto, idCommentoMain]
    )

    return result
}

export async function getCommentsByPost(idPost) {

    const [comments] = await connection.query(
        "SELECT * FROM comments WHERE idPost = ?",
        [idPost]
    )

    return comments
}

export async function updateComment(idCommento, contenuto) {

    const [result] = await connection.query(
        `UPDATE comments
         SET contenuto = ?
         WHERE idCommento = ?`,
        [contenuto, idCommento]
    )

    return result
}