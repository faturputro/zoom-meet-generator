import * as dotenv from 'dotenv';
import { PoolConfig, Pool } from 'pg';
import IoRedis from 'ioredis';
// import db from '@/db/db';

dotenv.config();

// Generic App Config
export const SERVER_PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REDIS_CONF = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_SECRET,
  db: Number(process.env.REDIS_DB),
};

export const dbConfig: PoolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  keepAlive: true,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 3000,
};

// export const dbInstance = new Pool(dbConfig);

export const ioRedis = new IoRedis(REDIS_CONF);

ioRedis.on('error', (err) => {
  console.log('Cannot connect to redis', err);
});

ioRedis.on('connect', () => {
  console.log('Successfully connected to redis');
});

// dbInstance.on('connect', () => {
//   'Successfully connected to database!'
// });
