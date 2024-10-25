import { ProductSchema } from './entities/product.entity';
import {
  DATA_SOURCE,
  PRODUCT_REPOSITORY,
} from 'src/utils/constants/services.constants';
import { Connection } from 'mongoose';
export const ProductProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (connetion: Connection) =>
      connetion.model('Product', ProductSchema),
    inject: [DATA_SOURCE],
  },
];
