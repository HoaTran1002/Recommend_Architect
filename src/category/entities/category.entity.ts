import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string; 

  @Column({ nullable: true })
  parentId: string; 

  @OneToMany(() => Product, (product) => product.category) 
  products: Product[];

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  tags: string[];
}
