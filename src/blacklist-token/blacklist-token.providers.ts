import { DataSource } from "typeorm";
import { BlacklistToken, BlacklistTokenSchema } from "./entities/blacklist-token.entity";
import { BLACKLIST_TOKEN_REPOSITORY, DATA_SOURCE } from "src/common/services";
import { Connection } from "mongoose";

export const BlacklistTokenProviders = [
    {
      provide: BLACKLIST_TOKEN_REPOSITORY,
      useFactory: (connection: Connection) => connection.model('BlacklistToken', BlacklistTokenSchema),
      inject: [DATA_SOURCE],
    },
]
