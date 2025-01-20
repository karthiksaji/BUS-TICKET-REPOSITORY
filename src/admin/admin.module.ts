import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BusRoute } from './Entities/bus-route.entity';
import { Ticket } from '../user/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusRoute, Ticket])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
