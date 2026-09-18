import { connection } from "../database.js"

export async function getRecentPosts() {

    const [posts] = await connection.query(
        `SELECT *
         FROM posts
         ORDER BY data_creazione DESC`
    )

    return posts
}

export async function getPopularPosts() {

    const [posts] = await connection.query(
        `SELECT posts.*, COUNT(post_likes.idPost) AS likes
         FROM posts
         LEFT JOIN post_likes ON posts.idPost = post_likes.idPost
         GROUP BY posts.idPost
         ORDER BY likes DESC`
    )

    return posts
}

export async function getForYouPosts(idUtente) {

    const [posts] = await connection.query(
        `SELECT DISTINCT posts.*
         FROM posts
         LEFT JOIN user_follows
            ON posts.idUtente = user_follows.idSeguito
         LEFT JOIN post_tags
            ON posts.idPost = post_tags.idPost
         LEFT JOIN tag_follows
            ON post_tags.idTag = tag_follows.idTag
         WHERE user_follows.idFollower = ?
            OR tag_follows.idUtente = ?
         ORDER BY posts.data_creazione DESC`,
        [idUtente, idUtente]
    )

    return posts
}