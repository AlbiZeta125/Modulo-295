import { connection } from "../database.js"

export async function addLike(idPost, idUtente) {

    const [result] = await connection.query(
        `INSERT INTO post_likes (idPost, idUtente)
         VALUES (?, ?)`,
        [idPost, idUtente]
    )

    return result
}

export async function removeLike(idPost, idUtente) {

    const [result] = await connection.query(
        `DELETE FROM post_likes
         WHERE idPost = ? AND idUtente = ?`,
        [idPost, idUtente]
    )

    return result
}

export async function getLikesCount(idPost) {

    const [result] = await connection.query(
        `SELECT COUNT(*) AS likes
         FROM post_likes
         WHERE idPost = ?`,
        [idPost]
    )

    return result[0]
}

export async function addCommentLike(idCommento, idUtente) {

    const [result] = await connection.query(
        `INSERT INTO comment_likes (idCommento, idUtente)
         VALUES (?, ?)`,
        [idCommento, idUtente]
    )

    return result
}

export async function removeCommentLike(idCommento, idUtente) {

    const [result] = await connection.query(
        `DELETE FROM comment_likes
         WHERE idCommento = ? AND idUtente = ?`,
        [idCommento, idUtente]
    )

    return result
}

export async function getCommentLikesCount(idCommento) {

    const [result] = await connection.query(
        `SELECT COUNT(*) AS likes
         FROM comment_likes
         WHERE idCommento = ?`,
        [idCommento]
    )

    return result[0]
}