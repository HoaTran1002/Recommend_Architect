import "dotenv/config";
import { response } from "express";
import {z} from 'zod'
const envs = process.env
const envSchema = z.object({
    PORT:z.number(),
    MYSQL_DATABASE:z.string(),
    MYSQL_USER:z.string(),
    MYSQL_PASSWORD:z.string(),
    MYSQL_ROOT_PASSWORD:z.string()
})
try {
    const resultValidate = envSchema.parse(envs)

} catch (error) {
    // throw new Error(error)
}

export const varsEnv = {
    PORT:envs.PORT,
    MYSQL_DATABASE:envs.MYSQL_DATABASE,
    MYSQL_USER:envs.MYSQL_USER,
    MYSQL_PASSWORD:envs.MYSQL_PASSWORD,
    MYSQL_ROOT_PASSWORD:envs.MYSQL_ROOT_PASSWORD
}