import { connection } from "../database.js"

export async function getAllTags() {

    const [tags] = await connection.query("SELECT * FROM tags")

    return tags
}

export async function createTag(nome) {

    const [result] = await connection.query(
        "INSERT INTO tags (nome) VALUES (?)",
        [nome]
    )

    return result
}

export async function addTagToPost(idPost, idTag) {

    const [result] = await connection.query(
        `INSERT INTO post_tags (idPost, idTag)
         VALUES (?, ?)`,
        [idPost, idTag]
    )

    return result
}

export async function getTagsByPost(idPost) {

    const [tags] = await connection.query(
        `SELECT tags.*
         FROM tags
         JOIN post_tags ON tags.idTag = post_tags.idTag
         WHERE post_tags.idPost = ?`,
        [idPost]
    )

    return tags
}

export async function removeTagFromPost(idPost, idTag) {

    const [result] = await connection.query(
        `DELETE FROM post_tags
         WHERE idPost = ? AND idTag = ?`,
        [idPost, idTag]
    )

    return result
}