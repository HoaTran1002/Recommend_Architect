import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { DATA_SOURCE, USER_REPOSITORY } from "src/common/services";

export const UserProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE],
      },
]
