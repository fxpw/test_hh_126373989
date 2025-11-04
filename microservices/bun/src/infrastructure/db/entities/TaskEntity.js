import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id;

	@Column()
	title;

	@Column({ nullable: true })
	description;

	@Column({ type: 'timestamp', nullable: true })
	dueDate;

	@Column({ type: 'enum', enum: ['pending', 'completed'], default: 'pending' })
	status;
}
