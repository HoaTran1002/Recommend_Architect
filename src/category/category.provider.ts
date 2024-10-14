import { DataSource } from "typeorm";
import { CATEGORY_REPOSITORY, DATA_SOURCE } from "src/common/services";
import { Category } from "./entities/category.entity";
export const CategoryProviders =[
    {
        provide: CATEGORY_REPOSITORY,
        useFactory: (dataSource:DataSource) => dataSource.getRepository(Category),
        inject:[DATA_SOURCE]
    }
]