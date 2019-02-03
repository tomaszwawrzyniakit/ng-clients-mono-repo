import { NgModule } from '@angular/core';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { EventLibModule } from 'event-lib';
import { TalkOverviewDialogComponent } from './components/talk-overview-dialog/talk-overview-dialog.component';

@NgModule({
  declarations: [ScheduleDialogComponent, TalkOverviewDialogComponent],
  imports: [
    SharedModule, EventLibModule
  ]
})
export class EventModule { }
