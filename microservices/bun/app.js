import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './src/infrastructure/db/data-source.js';
import './src/infrastructure/http/server.js';

AppDataSource.initialize()
	.then(() => console.log('✅ Database connected'))
	.catch(err => console.error('❌ DB init error:', err));
