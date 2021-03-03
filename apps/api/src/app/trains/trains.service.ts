import { Injectable } from '@nestjs/common';

import { TransportationService } from '../shared/transportation.service';

@Injectable()
export class TrainsService extends TransportationService {
  constructor() {
    super('train', 40);
  }
}
