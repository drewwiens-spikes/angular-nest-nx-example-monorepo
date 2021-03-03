import { Controller, Get } from '@nestjs/common';

import { TransportationController } from '../shared/transportation.controller';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController extends TransportationController {

  constructor(svc: BusesService) {
    super(svc);
  }

  @Get('mode')
  mode(): string {
    return 'buses';
  }

}
