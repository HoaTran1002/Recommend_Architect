import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    userName: string

    @Column()
    password: string

    @Column()
    role: string

    @Column()
    active: boolean
    
    @Column()
    refresh_token: string
}