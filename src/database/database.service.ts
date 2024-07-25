import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private client: Client;

  async onApplicationBootstrap() {
    this.client = new Client({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 12567,
      database: process.env.DB_NAME || 'postgres',
    });

    try {
      await this.client.connect();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }

  async onApplicationShutdown() {
    await this.client.end();
    console.log('Database connection closed');
  }

  async executeQuery(query: string, params: any[] = []) {
    try {
      const result = await this.client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}
