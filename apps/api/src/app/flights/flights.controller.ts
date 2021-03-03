import { Controller, Get } from '@nestjs/common';

import { TransportationController } from '../shared/transportation.controller';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController extends TransportationController {

  constructor(svc: FlightsService) {
    super(svc);
  }

  @Get('mode')
  mode(): string {
    return 'flights';
  }

}
