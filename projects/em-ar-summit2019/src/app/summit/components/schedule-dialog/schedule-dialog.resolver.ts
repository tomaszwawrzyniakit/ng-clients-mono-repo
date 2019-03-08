import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Schedule } from 'event-lib';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { summits, SummitService } from '../../services/summit.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDialogResolver implements Resolve<Schedule> {
  constructor(private summitService: SummitService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Schedule> | Promise<Schedule> | Schedule {
    const summitName = route.params['summitName'];
    const summit = (summitName && summits.fromName(summitName)) || summits.ARCH_WRO;
    return this.summitService.getScheduleOf(summit);
  }
}
