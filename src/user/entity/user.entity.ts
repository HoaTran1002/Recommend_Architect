import * as mongoose from 'mongoose';

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
});
import { Document } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';

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
  refresh_token?: string;
}
