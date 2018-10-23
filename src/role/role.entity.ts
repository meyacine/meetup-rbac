import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from '../permission/permission.entity';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 100})
    displayName: string;

    @Column({length: 255})
    description: string;

    @ManyToMany(type => Permission)
    @JoinTable()
    permissions: Permission[];
}
