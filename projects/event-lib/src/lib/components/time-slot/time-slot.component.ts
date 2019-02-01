import { Component, Input } from '@angular/core';
import { TimeSlot } from '../../services/model';

@Component({
  selector: 'elib-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent {
  @Input()
  timeSlot: TimeSlot;
}
