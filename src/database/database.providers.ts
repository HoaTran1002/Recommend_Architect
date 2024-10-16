// import { DATA_SOURCE } from 'src/common/services';
// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: DATA_SOURCE,
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: 'user',
//         password: 'password',
//         database: 'recommendarhitect',
//         entities: [
//             __dirname + '/../**/*.entity{.ts,.js}',
//         ],
//         synchronize: true,
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
import mongoose from 'mongoose';
import { MONGODB_URI } from 'src/common/constants';
import { DATA_SOURCE } from 'src/common/services';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(MONGODB_URI),
  },
];
