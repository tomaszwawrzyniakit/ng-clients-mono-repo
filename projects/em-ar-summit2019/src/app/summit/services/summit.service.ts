import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventTo, Schedule, selectSchedule } from 'event-lib';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Summit {
  name: string;
}

export const summits = (function () {
  const allSummits = {
    'arch-wro': {name: 'arch-wro'},
    'arch-pnq': {name: 'arch-pnq'},
    'em-fra': {name: 'em-fra'},
    'em-pnq': {name: 'em-pnq'}
  };

  function fromName(name: string) {
    return allSummits[name];
  }

  return {
    ARCH_WRO: fromName('arch-wro'),
    ARCH_PNQ: fromName('arch-pnq'),
    EM_FRA: fromName('em-fra'),
    EM_PNQ: fromName('em-pnq'),

    fromName: fromName
  };
})();

@Injectable({providedIn: 'root'})
export class SummitService {
  private readonly summitNameKey = 'summitName';

  private currentSummit: Summit;

  private cachedEventData: { [summitName: string]: Observable<EventTo> } = {};

  constructor(private http: HttpClient) {
  }

  private getEvent(summit: Summit): Observable<EventTo> {
    const url = environment.production ? `api/event/${summit.name}` : `assets/${summit.name}/event.json`;

    if (!this.cachedEventData[summit.name]) {
      this.cachedEventData[summit.name] = this.http.get<EventTo>(url).pipe(
        shareReplay(1)
      );
    }
    return this.cachedEventData[summit.name];
  }

  public getStoredSummit(): Summit {
    if (!this.currentSummit) {
      const storedSummitName = localStorage.getItem(this.summitNameKey);
      if (storedSummitName) {
        this.currentSummit = summits.fromName(storedSummitName);
      }
    }

    return this.currentSummit;
  }

  public storeSummit(summit: Summit) {
    this.currentSummit = summit;
    localStorage.setItem(this.summitNameKey, summit.name);
  }

  public getScheduleOf(summit: Summit): Observable<Schedule> {
    return this.getEvent(summit)
      .pipe(map(event => {
        const schedule = selectSchedule(event);
        if (schedule) {
          return schedule;
        } else {
          throw new Error('Data from server could not be transformed');
        }
      }));
  }
}
