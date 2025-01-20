import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { BusRoute } from '../admin/entities/bus-route.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(BusRoute)
    private readonly busRouteRepository: Repository<BusRoute>,
  ) {}

  // Search for buses based on route
  async searchBus(route: string) {
    return await this.busRouteRepository.find({ where: { route } });
  }

  // Book a ticket for a specific bus route
  async bookTicket(bookingDetails: { passengerName: string; route: string }) {
    const busRoute = await this.busRouteRepository.findOne({
      where: { route: bookingDetails.route },
    });

    if (!busRoute) {
      throw new Error('Bus route not found.');
    }

    if (busRoute.capacity <= 0) {
      throw new Error('No seats available.');
    }

    // Decrement available capacity
    busRoute.capacity -= 1;
    await this.busRouteRepository.save(busRoute);

    // Create a ticket
    const ticket = this.ticketRepository.create({
      passengerName: bookingDetails.passengerName,
      route: bookingDetails.route,
      status: 'Booked',
    });

    return await this.ticketRepository.save(ticket);
  }

  // Confirm a ticket
  async confirmTicket(id: number) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      throw new Error('Ticket not found.');
    }

    ticket.status = 'Confirmed';
    return await this.ticketRepository.save(ticket);
  }

  // Cancel a ticket
  async cancelTicket(id: number) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      throw new Error('Ticket not found.');
    }

    // Increment bus capacity
    const busRoute = await this.busRouteRepository.findOne({
      where: { route: ticket.route },
    });

    if (busRoute) {
      busRoute.capacity += 1;
      await this.busRouteRepository.save(busRoute);
    }

    ticket.status = 'Cancelled';
    return await this.ticketRepository.save(ticket);
  }
}
