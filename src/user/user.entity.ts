import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany} from 'typeorm';
import {Role} from '../role/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    username: string;

    @Column({length: 255})
    password: string;

    @Column({length: 50})
    firstname: string;

    @Column({length: 50})
    lastname: string;

    @Column({length: 255})
    email: string;

    @Column('datetime')
    lastLogin: Date;

    @Column
    enabled: boolean;

    @Column('datetime')
    lastPasswordResetDate: Date;

    @ManyToMany(type => Role)
    @JoinTable()
    roles: Role[];
}
