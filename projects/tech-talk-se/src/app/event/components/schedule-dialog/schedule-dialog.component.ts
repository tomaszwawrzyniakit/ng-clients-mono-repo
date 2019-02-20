import { Component } from '@angular/core';
import { Schedule, TimeSlot } from 'event-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { createTalkId } from '../talk-overview-dialog/talk-overview-dialog.component';

@Component({
  selector: 'tt-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent {
  schedule: Schedule;

  constructor(route: ActivatedRoute, private router: Router) {
    this.schedule = route.snapshot.data['schedule'];
  }

  navigateToTalks(timeSlot: TimeSlot) {
    this.router.navigate(['/talks'], {fragment: createTalkId(timeSlot.talk)});
  }
}
