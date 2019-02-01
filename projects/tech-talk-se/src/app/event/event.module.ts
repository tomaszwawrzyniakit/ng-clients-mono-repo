import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { EventLibModule } from 'event-lib';

@NgModule({
  declarations: [ScheduleDialogComponent],
  imports: [
    SharedModule, EventLibModule
  ]
})
export class EventModule { }
