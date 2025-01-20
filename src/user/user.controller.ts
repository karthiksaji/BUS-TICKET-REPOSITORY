import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User') // Group endpoints under "User" in Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Search buses by route' })
  @ApiResponse({ status: 200, description: 'List of buses found.' })
  @ApiResponse({ status: 404, description: 'No buses found.' })
  @Get('search/:route')
  async searchBus(@Param('route') route: string) {
    return this.userService.searchBus(route);
  }

  @ApiOperation({ summary: 'Book a ticket for a bus route' })
  @ApiResponse({ status: 201, description: 'Ticket booked successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid request or no seats available.',
  })
  @ApiBody({
    description: 'Details for booking a ticket',
    schema: {
      example: {
        passengerName: 'John Doe',
        route: 'CityA-CityB',
      },
    },
  })
  @Post('book-ticket')
  async bookTicket(
    @Body() bookingDetails: { passengerName: string; route: string },
  ) {
    return this.userService.bookTicket(bookingDetails);
  }

  @ApiOperation({ summary: 'Confirm a ticket' })
  @ApiResponse({ status: 200, description: 'Ticket confirmed successfully.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @Post('confirm-ticket/:id')
  async confirmTicket(@Param('id') id: number) {
    return this.userService.confirmTicket(id);
  }

  @ApiOperation({ summary: 'Cancel a ticket' })
  @ApiResponse({ status: 200, description: 'Ticket canceled successfully.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @Post('cancel-ticket/:id')
  async cancelTicket(@Param('id') id: number) {
    return this.userService.cancelTicket(id);
  }
}
