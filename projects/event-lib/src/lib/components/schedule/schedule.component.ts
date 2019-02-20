import { AfterContentChecked, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import * as _moment from 'moment';
import { Day, Schedule, TimeSlot } from '../../services/model';
import { DayComponent } from '../day/day.component';

const moment = _moment; // workaround for Rollup

@Component({
  selector: 'elib-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements AfterContentChecked {
  private _schedule: Schedule;

  @ViewChildren(DayComponent)
  dayComponents: QueryList<DayComponent>;

  scheduleHasSeveralDays: boolean;
  scheduleHasJustOneDay: boolean;
  noScheduleAvailable: boolean;

  initialDayIndex: number;

  get schedule(): Schedule {
    return this._schedule;
  }

  @Input()
  set schedule(value: Schedule) {
    const scheduleAvailable = value && value.days != null && value.days.length > 0;
    this.scheduleHasSeveralDays = scheduleAvailable && value.days.length > 1;
    this.scheduleHasJustOneDay = scheduleAvailable && value.days.length === 1;
    this.noScheduleAvailable = !scheduleAvailable;
    if (scheduleAvailable) {
      this.initialDayIndex = calculateDayIndex(value.days);
    }

    this._schedule = value;
  }

  @Output()
  timeSlotClick = new EventEmitter<TimeSlot>();

  timeSlotOfDayClicked(timeSlot: TimeSlot) {
    this.timeSlotClick.emit(timeSlot);
  }

  scrollToCurrentTimeSlot() {
    if (this.dayComponents) {
      this.dayComponents.forEach(dayComponent => dayComponent.scrollToCurrentTime());
    }
  }

  ngAfterContentChecked(): void {
    if (this.scheduleHasJustOneDay) {
      this.scrollToCurrentTimeSlot();
    }
  }
}

function calculateDayIndex(days: Day[]) {
  const now = moment();

  return days
    .map(day => day.date)
    .reduce((selectedIndex, currentDate, index, array) => {
      const isLastElement = index === array.length - 1;
      if (now.isSame(currentDate, 'day')
        || isLastElement && now.isAfter(currentDate, 'day')) {
        return index;
      }
      return selectedIndex;
    }, 0);

}
