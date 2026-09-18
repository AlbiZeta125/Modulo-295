import {connection} from "../database.js"
import bcrypt from "bcryptjs"

export async function getAllUtenti(){
    const [utenti] = await connection.query(
    `SELECT idUtente, username, first_name, last_name, email,
            birth_date, nationality, profile_image, visibility
     FROM users`
)
    console.log(utenti)
    return utenti
}

export async function getUserById(id) {
    const [utente] = await connection.query(
        `SELECT idUtente, username, first_name, last_name, email,
                birth_date, nationality, profile_image, visibility
         FROM users
         WHERE idUtente = ?`,
        [id]
    )

    return utente
}

export async function createUser(
    username,
    first_name,
    last_name,
    email,
    password_hash,
    birth_date,
    nationality
) {

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password_hash, salt)

    const [result] = await connection.query(
        `INSERT INTO users
        (username, first_name, last_name, email, password_hash, birth_date, nationality)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, first_name, last_name, email, hash, birth_date, nationality]
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

export async function updateVisibility(id, visibility) {

    const [result] = await connection.query(
        `UPDATE users
         SET visibility = ?
         WHERE idUtente = ?`,
        [visibility, id]
    )

    return result
}

export async function canViewProfile(idProfilo, idVisitatore) {

    const [users] = await connection.query(
        "SELECT visibility FROM users WHERE idUtente = ?",
        [idProfilo]
    )

    if (users.length === 0) {
        return false
    }

    if (idProfilo == idVisitatore) {
        return true
    }

    if (users[0].visibility === "public") {
        return true
    }

    if (users[0].visibility === "private") {
        return false
    }

    const [follow] = await connection.query(
        `SELECT * FROM user_follows
         WHERE idFollower = ? AND idSeguito = ?`,
        [idVisitatore, idProfilo]
    )

    return follow.length > 0
}
