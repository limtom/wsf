/**
 * Homecell model logic
 */

//Dependencies
import { type } from 'os';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Attendance } from './attendance';
import { Zone } from './zone';

@Entity('WSF_Centers')
export class WsfCenter extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
        unique: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    minister_name: string;

    @Column({
        nullable: true,
    })
    minister_phone_no: string;

    @Column({
        nullable: true,
    })
    address: string;

    @ManyToOne((type) => Zone, (zone) => zone.wsfCenters)
    @JoinColumn({
        name: 'zone_id'
    })
    zone: Zone;

    @OneToMany((type) => Attendance, (attendance) => attendance.wsfCenter, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    attendance: Attendance[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}
