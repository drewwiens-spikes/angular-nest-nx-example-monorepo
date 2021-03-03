import { Injectable } from '@nestjs/common';

import { ListAllEntities, CreateFareDtoWithMode, FareWithMode } from '@app/api-interfaces';
import { BusesService } from '../buses/buses.service';
import { FlightsService } from '../flights/flights.service';
import { TrainsService } from '../trains/trains.service';
import { priceSortFn } from '../shared/util';

@Injectable()
export class FaresService {

  private services: Array<BusesService | FlightsService | TrainsService>;

  constructor(
    private busesSvc: BusesService,
    private flightsSvc: FlightsService,
    private trainsSvc: TrainsService,
  ) {
    this.services = [this.busesSvc, this.flightsSvc, this.trainsSvc];
  }

  create(fare: CreateFareDtoWithMode): FareWithMode {
    const newFare = this.services
      .find(s => s.mode === fare.mode)
      ?.create(fare);
    return { ...newFare, mode: fare.mode };
  }

  findAll(query: ListAllEntities): FareWithMode[] {
    return this.services
      .filter(
        svc =>
          !(query.noBuses === 'true' && svc === this.busesSvc) &&
          !(query.noFlights === 'true' && svc === this.flightsSvc) &&
          !(query.noTrains === 'true' && svc === this.trainsSvc),
      )
      .reduce(
        (prev, svc) => prev.concat(svc.findAll(query).map(fare => ({ ...fare, mode: svc.mode }))),
        [] as FareWithMode[],
      )
      .sort(priceSortFn)
      .slice(0, +(query.limit));
  }

}
