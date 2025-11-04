import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { TaskStatus } from '@/domain/entities/Task.ts';

@Entity('tasks')
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar' })
	title!: string;

	@Column({ type: 'text', nullable: true })
	description?: string | null;

	@Column({ type: 'timestamp', nullable: true })
	dueDate?: Date | null;

	@Column({ type: 'enum', enum: ['pending', 'completed'], default: 'pending' })
	status!: TaskStatus;
}
