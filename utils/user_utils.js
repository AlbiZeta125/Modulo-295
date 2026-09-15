import {connection} from "../database.js"

export async function getAllUtenti(){
    const [utenti] = await connection.query("SELECT * FROM users")
    console.log(utenti)
    return utenti
}

export async function getUserById(id){

}