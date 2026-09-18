import { connection } from "../database.js"

export async function getAllPosts() {

    const [posts] = await connection.query("SELECT * FROM posts")

    return posts
}

export async function getPostById(id) {

    const [post] = await connection.query(
        "SELECT * FROM posts WHERE idPost = ?",
        [id]
    )

    return post
}

export async function createPost(idUtente, contenuto, immagine) {

    const [result] = await connection.query(
        `INSERT INTO posts (idUtente, contenuto, immagine)
         VALUES (?, ?, ?)`,
        [idUtente, contenuto, immagine]
    )

    return result
}

export async function updatePost(id, contenuto, immagine) {

    const [result] = await connection.query(
        `UPDATE posts
         SET contenuto = ?, immagine = ?
         WHERE idPost = ?`,
        [contenuto, immagine, id]
    )

    return result
}

export async function deletePost(idPost, idUtente) {

    const [result] = await connection.query(
        "DELETE FROM posts WHERE idPost = ? AND idUtente = ?",
        [idPost, idUtente]
    )

    return result
}