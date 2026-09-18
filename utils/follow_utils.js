import { connection } from "../database.js"

export async function followUser(idFollower, idSeguito) {

    const [result] = await connection.query(
        `INSERT INTO user_follows (idFollower, idSeguito)
         VALUES (?, ?)`,
        [idFollower, idSeguito]
    )

    return result
}

export async function unfollowUser(idFollower, idSeguito) {

    const [result] = await connection.query(
        `DELETE FROM user_follows
         WHERE idFollower = ? AND idSeguito = ?`,
        [idFollower, idSeguito]
    )

    return result
}

export async function getFollowers(idSeguito) {

    const [result] = await connection.query(
        `SELECT *
         FROM user_follows
         WHERE idSeguito = ?`,
        [idSeguito]
    )

    return result
}

export async function getFollowing(idFollower) {

    const [result] = await connection.query(
        `SELECT *
         FROM user_follows
         WHERE idFollower = ?`,
        [idFollower]
    )

    return result
}

export async function followTag(idUtente, idTag) {

    const [result] = await connection.query(
        `INSERT INTO tag_follows (idUtente, idTag)
         VALUES (?, ?)`,
        [idUtente, idTag]
    )

    return result
}

export async function unfollowTag(idUtente, idTag) {

    const [result] = await connection.query(
        `DELETE FROM tag_follows
         WHERE idUtente = ? AND idTag = ?`,
        [idUtente, idTag]
    )

    return result
}

export async function getFollowedTags(idUtente) {

    const [result] = await connection.query(
        `SELECT *
         FROM tag_follows
         WHERE idUtente = ?`,
        [idUtente]
    )

    return result
}