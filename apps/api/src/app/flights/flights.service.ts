import { Injectable } from '@nestjs/common';

import { TransportationService } from '../shared/transportation.service';

@Injectable()
export class FlightsService extends TransportationService {
  constructor() {
    super('flight', 10);
  }
}
