import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Schedule } from 'event-lib';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventService } from '../../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDialogResolver implements Resolve<Schedule> {
  constructor(private event: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Schedule> | Promise<Schedule> | Schedule {
    return this.event.getSchedule();
  }
}
