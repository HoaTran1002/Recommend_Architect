import {
  CATEGORY_REPOSITORY,
  DATA_SOURCE,
} from 'src/utils/constants/services.constants';
import { CategorySchema } from './entities/category.entity';
import { Connection } from 'mongoose';
export const CategoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model('Category', CategorySchema),
    inject: [DATA_SOURCE],
  },
];
