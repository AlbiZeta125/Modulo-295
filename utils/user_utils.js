import {connection} from "../database.js"

export async function getAllUtenti(){
    const [utenti] = await connection.query("SELECT * FROM users")
    console.log(utenti)
    return utenti
}

export async function getUserById(id){
    const [utente] = await connection.query(
        "SELECT * FROM users WHERE idUtente = ?",
        [id]
    )

    return utente

}

export async function createUser(username, first_name, last_name, email, password_hash, birth_date, nationality) {

    const [result] = await connection.query(
        `INSERT INTO users
        (username, first_name, last_name, email, password_hash, birth_date, nationality)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, first_name, last_name, email, password_hash, birth_date, nationality]
    )

    return result
}

export async function updateUser(id, username, first_name, last_name, email, nationality) {

    const [result] = await connection.query(
        `UPDATE users
        SET username = ?, first_name = ?, last_name = ?, email = ?, nationality = ?
        WHERE idUtente = ?`,
        [username, first_name, last_name, email, nationality, id]
    )

    return result
}

export async function deleteUser(id) {

    const [result] = await connection.query(
        "DELETE FROM users WHERE idUtente = ?",
        [id]
    )

    return result
}

export async function getAllComments(){
    const [comments] = await connection.query("SELECT * FROM comments")
    return comments
}

export async function createComment(idUtente, idPost, idCommentoMain, contenuto) {

    const [result] = await connection.query(
        `INSERT INTO comments
        (idUtente, idPost, idCommentoMain, contenuto)
        VALUES (?, ?, ?, ?)`,
        [idUtente, idPost, idCommentoMain, contenuto]
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

export async function likeComment(idUtente, idCommento) {
    const [result] = await connection.query(
        `INSERT INTO comment_likes
        (idUtente, idCommento)
        VALUES (?, ?)`,
        [idUtente, idCommento]
    )
    return result
}