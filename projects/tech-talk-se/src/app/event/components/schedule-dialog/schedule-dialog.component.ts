import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'event-lib';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tt-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent {
  schedule: Schedule;

  constructor(route: ActivatedRoute) {
    this.schedule = route.snapshot.data['schedule'];
  }
}
