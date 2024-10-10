import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column({ type: 'int', default: 0 })
  enrollmentCount: number; 

  @Column({ type: 'date' })
  releaseDate: Date; 

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  ratingCount: number;

  @Column({ type: 'float', default: 0 })
  discount: number;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column('simple-array', { nullable: true })
  prerequisites: string[];

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'int', default: 0 })
  purchaseCount: number;

  @Column({ type: 'float', default: 0 })
  popularityScore: number;

  @Column({ nullable: true })
  videoPreviewUrl: string;

  @Column('simple-array', { nullable: true })
  learningObjectives: string[];

  @Column({ nullable: true })
  certificate: boolean;

  @Column({ nullable: true })
  refundPolicy: string;

  @Column('simple-array', { nullable: true })
  targetAudience: string[];

  @Column({ nullable: true })
  lastUpdated: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
