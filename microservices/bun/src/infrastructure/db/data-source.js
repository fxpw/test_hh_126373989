import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TaskEntity } from './entities/TaskEntity.js';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT || 5432),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [TaskEntity],
	migrations: ['./src/infrastructure/db/migrations/*.js'],
	synchronize: true,
	logging: false
});
