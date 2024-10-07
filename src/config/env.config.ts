import "dotenv/config";

const envs = process.env
export const varsEnv = {
    PORT:envs.PORT,
    MYSQL_DATABASE:envs.MYSQL_DATABASE,
    MYSQL_USER:envs.MYSQL_USER,
    MYSQL_PASSWORD:envs.MYSQL_PASSWORD,
    MYSQL_ROOT_PASSWORD:envs.MYSQL_ROOT_PASSWORD
}