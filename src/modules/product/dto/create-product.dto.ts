import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsArray,
} from 'class-validator';
import { Express } from 'express';

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
  @Type(() => Date) // Chuyển đổi chuỗi thành Date
  releaseDate?: Date;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean) // Chuyển đổi chuỗi thành boolean
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Kiểm tra từng phần tử trong mảng là string
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
  @IsString({ each: true }) // Kiểm tra từng phần tử trong mảng là string
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
  pathImage?: Express.Multer.File; // Chấp nhận tệp hình ảnh

  @IsOptional()
  videoUrl?: Express.Multer.File; // Chấp nhận tệp video

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Kiểm tra từng phần tử trong mảng là string
  learningObjectives?: string[];

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean) // Chuyển đổi chuỗi thành boolean
  certificate?: boolean;

  @IsOptional()
  @IsString()
  refundPolicy?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Kiểm tra từng phần tử trong mảng là string
  targetAudience?: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date) // Chuyển đổi chuỗi thành Date
  lastUpdated?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string; // Nếu bạn muốn nhận ID của `Category` thay vì cả đối tượng
}
