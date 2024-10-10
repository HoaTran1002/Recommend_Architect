import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blacklist')
export class BlacklistToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'text' })
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
