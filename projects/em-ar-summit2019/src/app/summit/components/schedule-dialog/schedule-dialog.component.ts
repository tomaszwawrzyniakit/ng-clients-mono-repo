import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'event-lib';

@Component({
  selector: 's19-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent {
  schedule: Schedule;


  constructor(route: ActivatedRoute) {
    this.schedule = route.snapshot.data['schedule'];
  }
}
