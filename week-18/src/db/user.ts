import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    // Insert a new user into the users table
    const response = await prisma.user.create({
        data:{
            username,password,name
        }
    })
    return response;
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
    // Retrieve a user by ID from the users table
    const response = await prisma.user.findFirst({where:{
        id: userId
    }})
    return response;
}
