/**
 * User model logic
 */

//Dependencies
import bcrypt from 'bcrypt'
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Zone } from './zone';

enum Role {
    Basic = 'Basic',
    Admin = 'Admin'
}

@Entity('Users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') user_id: string;

    @Column()
    name: string

    @Column({
        unique: true
    })
    phone_number: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: Role,
        default:Role.Basic
    })
    role: string

    @OneToOne((type) => Zone, (zone) => zone.zonal_coord)
    zone: Zone        

    @BeforeInsert() 
    hashPassword = () => {
        return this.password = bcrypt.hashSync(this.password, 10)
    }

    comparePassword = (stringPassword: string) => {
        return bcrypt.compareSync(stringPassword, this.password)
    }

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}
