import { connection } from "../database.js"
import bcrypt from "bcryptjs"

export async function getUserByUsername(username) {

    const [users] = await connection.query(
        `SELECT *
         FROM users
         WHERE username = ?`,
        [username]
    )

    return users
}

export async function loginUser(username, password) {

    const users = await getUserByUsername(username)

    if (users.length === 0) {
        return null
    }

    const user = users[0]

    const passwordCorretta = await bcrypt.compare(
        password,
        user.password_hash
    )

    if (!passwordCorretta) {
        return null
    }

    return user
}

export function isAuthenticated(request, response, next) {

    if (request.session.user_id) {
        next()
    } else {
        response.status(401).send("Devi effettuare il login")
    }
}