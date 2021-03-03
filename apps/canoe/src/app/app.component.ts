import {
  startWith,
  switchMap,
  debounceTime,
  finalize,
  distinctUntilChanged,
  catchError,
  map,
} from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { isEqual } from 'lodash-es';

import { cities, cityValidator, getOptionsObs } from './util';
import { Fare } from '@app/api-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('originInput', { static: true }) originInput: ElementRef;
  @ViewChild('originAuto', { static: true }) originAuto: MatAutocomplete;
  @ViewChild('destInput', { static: true }) destInput: ElementRef;
  @ViewChild('destAuto', { static: true }) destAuto: MatAutocomplete;

  cities = cities;

  origin = new FormControl('', cityValidator);
  dest = new FormControl('', cityValidator);
  numResults = new FormControl(50);
  modes = new FormControl(['Flights', 'Buses', 'Trains'], Validators.required);

  filteredOriginOptions: Observable<string[]>;
  filteredDestOptions: Observable<string[]>;
  results: Observable<Partial<Fare>[]>;
  loading = new BehaviorSubject<boolean>(false);

  constructor(http: HttpClient) {
    this.filteredOriginOptions = getOptionsObs(this.origin);
    this.filteredDestOptions = getOptionsObs(this.dest);

    this.results = combineLatest([
      this.origin.valueChanges.pipe(map((origin) => origin.toUpperCase())),
      this.dest.valueChanges.pipe(map((origin) => origin.toUpperCase())),
      this.numResults.valueChanges.pipe(startWith(this.numResults.value)),
      this.modes.valueChanges.pipe(startWith(this.modes.value)) as Observable<
        string[]
      >,
    ]).pipe(
      distinctUntilChanged(isEqual),
      debounceTime(250), // Wait for the user to stop typing for x milliseconds
      switchMap(([origin, dest, numResults, modes]) => {
        // Set query params:
        const params = new HttpParams()
          .set('limit', numResults)
          .set('origin', origin)
          .set('dest', dest)
          .set(
            'noFlights',
            modes.find((m) => m === 'Flights') ? 'false' : 'true'
          )
          .set('noBuses', modes.find((m) => m === 'Buses') ? 'false' : 'true')
          .set(
            'noTrains',
            modes.find((m) => m === 'Trains') ? 'false' : 'true'
          );

        // Show loading progressbar if HTTP request takes a while:
        const loadingTimer = setTimeout(() => this.loading.next(true), 500);

        // Send the HTTP request:
        return http
          .get<Fare[]>('/api/fares/findAll', { params })
          .pipe(
            finalize(() => {
              clearTimeout(loadingTimer);
              this.loading.next(false); // Hide the loading progressbar
            }),
            // Display an error message in place of the transportation emoji:
            catchError(() => of([{ mode: 'Connection error!' } as Partial<Fare>]))
          );
      })
    );
  }

  originEnter() {
    this.originInput.nativeElement.blur();
    const curOpts = cities.filter((c) =>
      c.toLowerCase().includes(this.origin.value.toLowerCase())
    );
    if (curOpts.length && this.origin.value) {
      this.origin.setValue(curOpts[0]);
    }
  }

  destEnter() {
    this.destInput.nativeElement.blur();
    const curOpts = cities.filter((c) =>
      c.toLowerCase().includes(this.dest.value.toLowerCase())
    );
    if (curOpts.length && this.origin.value) {
      this.dest.setValue(curOpts[0]);
    }
  }
}
