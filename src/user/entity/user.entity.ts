import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @Column({ nullable: true }) 
  address: string;

  @Column({ nullable: true, type: 'int' })
  age: number;

  @Column({ nullable: true })
  numberPhone: string;

  @Column({ nullable: true }) 
  gender: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true, type: 'text' })
  refresh_token: string;
}
