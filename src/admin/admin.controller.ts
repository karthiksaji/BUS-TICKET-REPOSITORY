import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin') // Group endpoints under "Admin" in Swagger
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Add a new bus route' })
  @ApiResponse({ status: 201, description: 'Bus route added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid route details.' })
  @ApiBody({
    description: 'Details for adding a bus route',
    schema: {
      example: {
        route: 'CityA-CityB',
        departureTime: '2025-01-20T08:00:00Z',
        arrivalTime: '2025-01-20T10:00:00Z',
        capacity: 50,
      },
    },
  })
  @Post('add-bus-route')
  async addBusRoute(
    @Body()
    routeDetails: {
      route: string;
      departureTime: string;
      arrivalTime: string;
      capacity: number;
    },
  ) {
    return this.adminService.addBusRoute(routeDetails);
  }

  @ApiOperation({ summary: 'Get list of all bookings' })
  @ApiResponse({ status: 200, description: 'List of all bookings.' })
  @Get('booking-list')
  async getBookingList() {
    return this.adminService.getBookingList();
  }

  @ApiOperation({ summary: 'Get list of passengers for a specific route' })
  @ApiResponse({
    status: 200,
    description: 'List of passengers for the route.',
  })
  @ApiResponse({
    status: 404,
    description: 'No passengers found for the route.',
  })
  @Get('passenger-list/:route')
  async getPassengerList(@Param('route') route: string) {
    return this.adminService.getPassengerList(route);
  }
}
