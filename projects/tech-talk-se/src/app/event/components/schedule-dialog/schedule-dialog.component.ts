import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { Schedule } from 'event-lib';

@Component({
  selector: 'tt-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {
  schedule$: Observable<Schedule>;

  constructor(private event: EventService) {
  }

  ngOnInit() {
    this.schedule$ = this.event.getSchedule();
  }
}
