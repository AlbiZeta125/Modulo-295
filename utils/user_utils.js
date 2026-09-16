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