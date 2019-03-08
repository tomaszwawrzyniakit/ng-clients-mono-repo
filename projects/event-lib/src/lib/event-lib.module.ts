import { NgModule } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DayComponent } from './components/day/day.component';
import { TimeSlotComponent } from './components/time-slot/time-slot.component';
import { CommonModule } from '@angular/common';
import { ElibNgMaterialModule } from './elib-ng-material.module';
import { AutoClosableSidenavDirective } from './directives/auto-closable-sidenav/auto-closable-sidenav.directive';

@NgModule({
  declarations: [ScheduleComponent, DayComponent, TimeSlotComponent, AutoClosableSidenavDirective],
  imports: [CommonModule, ElibNgMaterialModule],
  exports: [ScheduleComponent, DayComponent, TimeSlotComponent, AutoClosableSidenavDirective]
})
export class EventLibModule {
}
