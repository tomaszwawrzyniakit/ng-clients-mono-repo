import { NgModule } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DayComponent } from './components/day/day.component';
import { TimeSlotComponent } from './components/time-slot/time-slot.component';
import { CommonModule } from '@angular/common';
import { ElibNgMaterialModule } from './elib-ng-material.module';

@NgModule({
  declarations: [ScheduleComponent, DayComponent, TimeSlotComponent],
  imports: [CommonModule, ElibNgMaterialModule],
  exports: [ScheduleComponent, DayComponent, TimeSlotComponent]
})
export class EventLibModule {
}
