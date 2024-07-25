import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RoomModule, DatabaseModule],
})
export class AppModule {}
