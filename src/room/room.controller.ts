import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('freeStatusRange/:roomId')
  async getFreeStatusRangeByRoomId(
    @Param('roomId') roomId: number,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.roomService.checkRoomForDates(roomId, startDate, endDate);
  }
  @Get('freeStatusDate/:roomId')
  async getFreeStatusDateByRoomId(
    @Param('roomId') roomId: number,
    @Query('date') date: Date,
  ) {
    return this.roomService.checkRoomForDate(roomId, date);
  }

  @Get('freeRoomsRange/')
  async getFreeRooms(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.roomService.checkRoomsForDates(startDate, endDate);
  }
}
