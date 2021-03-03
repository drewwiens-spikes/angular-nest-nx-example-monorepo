import { cities, CreateFareDto } from '@app/api-interfaces';

const NUM_FARES = 2000;
const PRICE_SWING = 500;
const NUM_DAYS = 7;

export function randIdx(n: number) {
  return Math.round(Math.random() * 1000000) % n; // OK for demos
}

export function generateRandomFares(maxDuration = 1): CreateFareDto[] {
  const fares: CreateFareDto[] = [];
  for (let id = 0; id < NUM_FARES; id++) {
    const origin = cities[randIdx(cities.length)];
    const dest = cities.filter(c => c !== origin)[randIdx(cities.length - 1)];
    const today = new Date();
    const hours = randIdx(24);
    const mins = randIdx(60);
    const date = today.getDate() + Math.random() * NUM_DAYS;
    const depart = new Date(today.getFullYear(), today.getMonth(), date, hours, mins).toISOString();
    const arrivalHours = hours + Math.ceil(Math.random() * maxDuration);
    const arrivalMins = mins + Math.floor(Math.random() * 60);
    const arrive = new Date(today.getFullYear(), today.getMonth(), today.getDate(), arrivalHours, arrivalMins).toISOString();
    const price = 80 + Math.round(Math.random() * PRICE_SWING * 100) / 100; // Round to 2 decimals
    fares.push({ origin, dest, depart, arrive, price });
  }
  return fares;
}

export const priceSortFn = (a: CreateFareDto, b: CreateFareDto) => a.price >= b.price ? 1 : (a.price === b.price ? 0 : -1);
