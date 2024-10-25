import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/modules/role/entities/role.entity';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  address: { type: String, nullable: true },
  age: { type: Number, nullable: true },
  numberPhone: { type: String, nullable: true },
  gender: { type: String, nullable: true },
  active: { type: Boolean, default: true },
  refresh_token: { type: String, nullable: true },
  searchHistory: [{ type: String, nullable: true }], // Các từ khóa tìm kiếm gần đây của người dùng
  interests: { type: [String], nullable: true }, // Thêm sở thích người dùng
  preferredCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  ], // Danh mục ưa thích
  viewedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Sản phẩm đã xem
  recommendedProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ], // Sản phẩm đã được đề xuất
});

export interface User extends Document {
  email: string;
  userName: string;
  password: string;
  role: Role;
  address?: string;
  age?: number;
  numberPhone?: string;
  gender?: string;
  active: boolean;
  searchHistory?: string[];
  refresh_token?: string;
  interests?: string[];
  preferredCategories?: string[];
  purchaseHistory?: string[];
  viewedProducts?: string[];
  recommendedProducts?: string[];
}
