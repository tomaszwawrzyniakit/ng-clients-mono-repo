import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventTo, Schedule, selectSchedule, selectTalks, Talks } from 'event-lib';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private cachedEventData$: Observable<EventTo>;

  constructor(private http: HttpClient) {
  }

  private getEvent(): Observable<EventTo> {
    const url = environment.production ? 'api/event' : 'assets/event.json';

    if (!this.cachedEventData$) {
      this.cachedEventData$ = this.http.get<EventTo>(url).pipe(
        shareReplay(1)
      );
    }
    return this.cachedEventData$;
  }

  public getSchedule(): Observable<Schedule> {
    return this.getEvent()
      .pipe(map(event => {
        const schedule = selectSchedule(event);
        if (schedule) {
          return schedule;
        } else {
          throw new Error('Data from server could not be transformed');
        }
      }));
  }

  public getTalks(): Observable<Talks> {
    return this.getEvent()
      .pipe(map(event => {
        const talks = selectTalks(event);
        if (talks) {
          return talks;
        } else {
          throw new Error('Data from server could not be transformed');
        }
      }));
  }
}
