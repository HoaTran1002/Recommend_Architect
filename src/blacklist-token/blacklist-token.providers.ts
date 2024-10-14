import { DataSource } from "typeorm";
import { BlacklistToken } from "./entities/blacklist-token.entity";
import { BLACKLIST_TOKEN_REPOSITORY, DATA_SOURCE } from "src/common/services";

export const BlacklistTokenProviders = [
    {
      provide: BLACKLIST_TOKEN_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(BlacklistToken),
      inject: [DATA_SOURCE],
    },
]
