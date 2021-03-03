import { Injectable } from '@nestjs/common';

import { TransportationService } from '../shared/transportation.service';

@Injectable()
export class BusesService extends TransportationService {
  constructor() {
    super('bus', 20);
  }
}
