import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Schedule } from 'event-lib';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { summits, SummitService } from '../../services/summit.service';
import { retriveSummitName } from '../../../shared/resolver-helper';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDialogResolver implements Resolve<Schedule> {
  constructor(private summitService: SummitService) {
  }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Schedule> | Promise<Schedule> | Schedule {
    const summitName = retriveSummitName(route);
    const summit = summitName && summits.fromName(summitName);
    return this.summitService.getScheduleOf(summit);
  }
}
