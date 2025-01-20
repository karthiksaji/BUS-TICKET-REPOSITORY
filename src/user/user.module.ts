import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Ticket } from './entities/ticket.entity';
import { BusRoute } from '../admin/Entities/bus-route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, BusRoute])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
