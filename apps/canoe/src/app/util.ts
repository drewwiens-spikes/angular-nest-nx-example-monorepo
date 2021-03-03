import { FormControl, ValidationErrors } from '@angular/forms';
import { startWith, map, shareReplay } from 'rxjs/operators';

export const cities = [
  'ATL',
  'DEN',
  'HOU',
  'LGA',
  'MSP',
  'ORD',
  'SEA',
  'SFO',
  'SJC',
  'STL',
  'YYZ',
];

export function cityValidator(ctrl: FormControl): ValidationErrors {
  return cities.find(c => c === ctrl.value) ? undefined : {
    invalidCity: true,
  };
}

export const filterCities = (value: string) => cities.filter(c =>
  c.toLowerCase().includes(value.toLowerCase()));

export const getOptionsObs = (fc: FormControl) => fc.valueChanges.pipe(
  startWith(''),
  map(value => cities.find(c => c === value) ? [] : filterCities(value)),
  shareReplay(1),
);
