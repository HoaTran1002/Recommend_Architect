import "dotenv/config";
import { response } from "express";
import {z} from 'zod'
const envs = process.env

const envSchema = z.object({
    PORT:z.string(),
    MYSQL_DATABASE:z.string(),
    MYSQL_USER:z.string(),
    MYSQL_PASSWORD:z.string(),
    MYSQL_ROOT_PASSWORD:z.string(),
    SECRET_KEY_ACCESS_TOKEN:z.string(),
    SECRET_KEY_REFRESH_TOKEN:z.string()

})
try {
    const resultValidate = envSchema.parse(envs)

} catch (error) {
    throw new Error(error)
}

export const varsEnv = {
    port:envs.PORT,
    mysqlDatabase:envs.MYSQL_DATABASE,
    mysqlUser:envs.MYSQL_USER,
    mysqlPassword:envs.MYSQL_PASSWORD,
    msqlRootPassword:envs.MYSQL_ROOT_PASSWORD,
    secretKeyAccessToken: envs.SECRET_KEY_ACCESS_TOKEN,
    secretKeyRefreshToken: envs.SECRET_KEY_REFRESH_TOKEN
}