import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column({ default: 'user' }) 
    role: string;

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

    @Column({ nullable: true })
    refresh_token: string;
}
