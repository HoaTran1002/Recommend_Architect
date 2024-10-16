import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, nullable: true },
  parentId: { type: String, nullable: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  isActive: { type: Boolean, default: true },
  tags: { type: [String], nullable: true },
});

export interface Category extends Document {
  name: string;
  description?: string; 
  parentId?: string; 
  products: string[]; 
  isActive?: boolean; 
  tags?: string[]; 
}
