import { UserSchema } from "./entity/user.entity";
import { DATA_SOURCE, USER_REPOSITORY } from "src/common/services";
import { Connection } from 'mongoose';
export const UserProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (connection: Connection) => connection.model('User',UserSchema),
        inject: [DATA_SOURCE],
      },
]
