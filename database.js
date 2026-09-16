import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const connection = mysql.createPool({
    user: process.env.MYSQL_DATABASE_USERNAME,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    host: process.env.MYSQL_DATABASE_HOST,
    database: process.env.MYSQL_DATABASE_DB,
    waitForConnections: true
})

export {connection}