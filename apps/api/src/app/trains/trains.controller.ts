import { Controller, Get } from '@nestjs/common';

import { TransportationController } from '../shared/transportation.controller';
import { TrainsService } from './trains.service';

@Controller('trains')
export class TrainsController extends TransportationController {

  constructor(svc: TrainsService) {
    super(svc);
  }

  @Get('mode')
  mode(): string {
    return 'trains';
  }

}
