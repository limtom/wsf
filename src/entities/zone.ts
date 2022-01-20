/**
 * WSF Zone model logic
 */

//Dependencies
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';
import { WsfCenter } from './wsf';

@Entity('Zones')
export class Zone extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column({
		unique: true,
	})
	name: string;

	@OneToOne((type) => User, (user) => user.zone, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager:true })
	@JoinColumn({
		name: 'zonal_coord',
	})
	zonal_coord: User;

	@OneToMany((type) => WsfCenter, (wsfcenter) => wsfcenter.zone, {
		cascade: true,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'wsf_centers',
	})
	wsfCenters: WsfCenter[];

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
