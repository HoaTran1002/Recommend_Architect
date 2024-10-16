import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, nullable: true },
  parentId: { type: String, nullable: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true },
  tags: { type: [String], nullable: true },
});
export interface Role extends mongoose.Document {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  users?: string[];
  isActive: boolean;
  tags?: string[];
}