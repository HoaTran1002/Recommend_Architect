import { CATEGORY_REPOSITORY, DATA_SOURCE } from "src/common/services";
import {  CategorySchema } from "./entities/category.entity";
import { Connection } from "mongoose";
export const CategoryProviders =[
    {
        provide: CATEGORY_REPOSITORY,
        useFactory: (connection:Connection) => connection.model('Category',CategorySchema),
        inject:[DATA_SOURCE]
    }
]