import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusRoute } from './entities/bus-route.entity';
import { Ticket } from '../user/entities/ticket.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(BusRoute)
    private readonly busRouteRepository: Repository<BusRoute>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  // Add a new bus route
  async addBusRoute(routeDetails: {
    route: string;
    departureTime: string;
    arrivalTime: string;
    capacity: number;
  }) {
    const newRoute = this.busRouteRepository.create(routeDetails);
    return await this.busRouteRepository.save(newRoute);
  }

  // Retrieve all booked tickets
  async getBookingList() {
    return await this.ticketRepository.find();
  }

  // Retrieve passengers for a specific route
  async getPassengerList(route: string) {
    return await this.ticketRepository.find({
      where: { route, status: 'Booked' },
    });
  }
}
