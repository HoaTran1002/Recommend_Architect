import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsBoolean, IsDate, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  enrollmentCount?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  releaseDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNumber()
  ratingCount?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  viewCount?: number;

  @IsOptional()
  @IsArray()
  prerequisites?: string[];

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsNumber()
  purchaseCount?: number;

  @IsOptional()
  @IsNumber()
  popularityScore?: number;

  @IsOptional()
  @IsString()
  videoPreviewUrl?: string;

  @IsOptional()
  @IsArray()
  learningObjectives?: string[];

  @IsOptional()
  @IsBoolean()
  certificate?: boolean;

  @IsOptional()
  @IsString()
  refundPolicy?: string;

  @IsOptional()
  @IsArray()
  targetAudience?: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastUpdated?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string; // Nếu bạn muốn nhận ID của `Category` thay vì cả đối tượng
}
