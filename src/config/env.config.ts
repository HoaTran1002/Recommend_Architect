import "dotenv/config";
import {z} from 'zod'
const envs = process.env

const envSchema = z.object({
    PORT:z.string(),
    MYSQL_DATABASE:z.string(),
    MYSQL_USER:z.string(),
    MYSQL_PASSWORD:z.string(),
    MYSQL_ROOT_PASSWORD:z.string(),
    ACCESS_TOKEN_SECRET_KEY:z.string(),
    REFRESH_TOKEN_SECRET_KEY:z.string()

})
try {
    envSchema.parse(envs)

} catch (error) {
    throw new Error(error)
}

export const varsEnv = {
    port:envs.PORT,
    mysqlDatabase:envs.MYSQL_DATABASE,
    mysqlUser:envs.MYSQL_USER,
    mysqlPassword:envs.MYSQL_PASSWORD,
    msqlRootPassword:envs.MYSQL_ROOT_PASSWORD,
    accessTokenSecretKey: envs.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: envs.REFRESH_TOKEN_SECRET_KEY
}