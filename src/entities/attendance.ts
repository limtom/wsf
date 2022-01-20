/**
 * WSF Attendance model logic
 */

//Dependencies
import { type } from "os";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WsfCenter } from "./wsf";

@Entity('Attendance')
export class Attendance extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({
        nullable: true
    })
    male: number
    
    @Column({
        nullable: true
    })
    female: number
    
    @Column({
        nullable: true
    })
    children: number
    
    @Column({
        nullable: true
    })
    total: number
    
    @Column({
        nullable: true
    })
    first_timers: number
    
    @Column({
        nullable: true
    })
    testifiers: number
    
    @Column({
        nullable: true
    })
    date: Date
    
    @ManyToOne((type) => WsfCenter, (wsfcenter) => wsfcenter.attendance)
    @JoinColumn({
        name: 'wsf_center'
    })
    wsfCenter: WsfCenter
    
    @BeforeInsert()
    sum = () => {
        return this.total = this.male + this.female + this.children
    }

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}