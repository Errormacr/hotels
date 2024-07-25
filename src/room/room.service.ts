import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoomService {
  constructor(private db: DatabaseService) {}

  async checkRoomForDates(roomId: number, startDate: Date, endDate: Date) {
    const query = `select * from orders where room_id = $1 and ((check_in_date between $2 and $3) or (check_out_date between $2 and $3))`;

    const params = [roomId, startDate, endDate];
    const orders = await this.db.executeQuery(query, params);
    if (!orders.length) {
      return 'Свободно';
    }

    return (
      'Занято ' +
      orders
        .map(
          (order) =>
            `c ${new Date(order.check_in_date).toLocaleDateString()} по ${new Date(order.check_out_date).toLocaleDateString()}`,
        )
        .join(' и ')
    );
  }
  async checkRoomsForDates(startDate: Date, endDate: Date) {
    const query = `select * from room where id not in (select room_id from orders where not (check_out_date < $1 or check_in_date > $2    ))`;

    const params = [startDate, endDate];
    const orders = await this.db.executeQuery(query, params);
    return orders;
  }
  async checkRoomForDate(roomId: number, date: Date) {
    const query = `select * from orders where room_id = $1 and ($2 between check_in_date and check_out_date) `;

    const params = [roomId, date];
    const orders = await this.db.executeQuery(query, params);
    if (!orders.length) {
      return 'Свободно';
    }

    return (
      'Занято ' +
      orders
        .map(
          (order) =>
            `c ${new Date(order.check_in_date).toLocaleDateString()} по ${new Date(order.check_out_date).toLocaleDateString()}`,
        )
        .join(' и ')
    );
  }
}
