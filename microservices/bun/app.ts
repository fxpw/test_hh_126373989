import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { AppDataSource } from './src/infrastructure/db/data-source.ts';
import './src/infrastructure/http/server.ts';

AppDataSource.initialize()
	.then(() => console.log('✅ Database connected'))
	.catch((err) => console.error('❌ DB init error:', err));
