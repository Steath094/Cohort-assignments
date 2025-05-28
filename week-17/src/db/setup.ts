import { client } from '../index';


export async function createTables() {
    // Users should create the tables manually as per the schema in README
    
    //creating users table
    await client.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            name VARCHAR(30) NOT NULL
        )`)
    //creating travel plans table
    await client.query(`CREATE TABLE IF NOT EXISTS travel_plans(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(30)  NOT NULL,
            destination_city VARCHAR(20)  NOT NULL,
            destination_country VARCHAR(30)  NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            budget NUMERIC(20) NOT NULL
        )`)

}

export async function dropTables() {
    await client.query(`DROP TABLE IF EXISTS travel_plans;`);
    await client.query(`DROP TABLE IF EXISTS users;`);
}
module.exports = { createTables, dropTables };
