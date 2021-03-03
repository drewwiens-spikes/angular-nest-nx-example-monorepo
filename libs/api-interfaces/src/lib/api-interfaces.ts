export const modes = ['bus', 'train', 'flight'] as const;

export const cities = [
  'STL',
  'SFO',
  'ORD',
  'MSP',
  'SJC',
  'LGA',
  'ATL',
  'DEN',
  'SEA',
  'YYZ',
  'HOU',
];

export type Mode = 'bus' | 'train' | 'flight';

export class CreateFareDto {
  origin: string;
  dest: string;
  depart: string; // ISO date string
  arrive: string;
  price: number;
}

export interface Fare extends CreateFareDto {
  id: number;
}

export class CreateFareDtoWithMode extends CreateFareDto {
  mode: Mode;
}

export interface FareWithMode extends CreateFareDtoWithMode {
  id: number;
}

export interface ListAllEntities {
  limit?: string;
  noBuses?: 'true';
  noTrains?: 'true';
  noFlights?: 'true';
  origin?: string;
  dest?: string;
}
