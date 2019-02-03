import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Talks } from 'event-lib';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventService } from '../../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class TalkOverviewDialogResolver implements Resolve<Talks> {
  constructor(private event: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Talks> | Promise<Talks> | Talks {
    return this.event.getTalks();
  }
}
