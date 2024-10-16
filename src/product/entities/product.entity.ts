import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  enrollmentCount: { type: Number, default: 0 },
  releaseDate: { type: Date },
  isActive: { type: Boolean, default: true },
  tags: { type: [String], nullable: true },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  prerequisites: { type: [String], nullable: true },
  duration: { type: String, nullable: true },
  language: { type: String, nullable: true },
  purchaseCount: { type: Number, default: 0 },
  popularityScore: { type: Number, default: 0 },
  videoPreviewUrl: { type: String, nullable: true },
  learningObjectives: { type: [String], nullable: true },
  certificate: { type: Boolean, nullable: true },
  refundPolicy: { type: String, nullable: true },
  targetAudience: { type: [String], nullable: true },
  lastUpdated: { type: Date },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});
import { Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  description: string;
  price: number;
  enrollmentCount?: number;
  releaseDate?: Date;
  isActive?: boolean;
  tags?: string[];
  rating?: number;
  ratingCount?: number;
  discount?: number;
  viewCount?: number;
  prerequisites?: string[];
  duration?: string;
  language?: string;
  purchaseCount?: number;
  popularityScore?: number;
  videoPreviewUrl?: string;
  learningObjectives?: string[];
  certificate?: boolean;
  refundPolicy?: string;
  targetAudience?: string[];
  lastUpdated?: Date;
  category: string;
}
