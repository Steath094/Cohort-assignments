import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const response = await client.query("INSERT INTO users(username,password,name) VALUES ($1,$2,$3) RETURNING username,password,name;",[username,password,name])
    const user = response.rows[0];
    return user;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const response = await client.query("SELECT * FROM users WHERE id = $1;",[userId])
    const user = response.rows[0];
    return user;
}


