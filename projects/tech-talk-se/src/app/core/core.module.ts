import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ScheduleDialogComponent } from '../event/components/schedule-dialog/schedule-dialog.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ScheduleDialogComponent
      },
      {path: '', redirectTo: '/', pathMatch: 'full'}
    ]),
  ],
  exports: [ShellComponent]
})
export class CoreModule {
}
