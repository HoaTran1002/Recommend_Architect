import { Connection } from 'mongoose';
import { RoleSchema } from './entities/role.entity';
import {
  DATA_SOURCE,
  ROLE_REPOSITORY,
} from 'src/utils/constants/services.constants';

export const RoleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model('Role', RoleSchema),
    inject: [DATA_SOURCE],
  },
];
