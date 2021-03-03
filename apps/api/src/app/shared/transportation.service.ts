import { Injectable } from '@nestjs/common';

import type { CreateFareDto, Fare, ListAllEntities, Mode } from './types';
import { generateRandomFares, priceSortFn } from './util';

@Injectable()
export abstract class TransportationService {

  protected fares: CreateFareDto[];

  constructor(readonly mode: Mode, readonly timeScale?: number) {
    this.fares = generateRandomFares(timeScale);
  }

  create(fare: CreateFareDto): Fare {
    const id = this.fares.push(fare);
    return { id, ...fare };
  }

  findAll(query: ListAllEntities): Fare[] {
    return this.fares
      .map((fare, id) => ({ id, ...fare }))
      .filter(f => f.origin === query.origin && f.dest === query.dest)
      .sort(priceSortFn)
      .slice(0, query.limit && +(query.limit));
  }

  findOne(id: number): Fare {
    return { id, ...this.fares[id] };
  }

  update(id: number,  updateFareDto: Partial<CreateFareDto>): Fare {
    const fare = { ...this.fares[id], ...updateFareDto };
    this.fares[id] = fare;
    return { id, ...fare };
  }

}
