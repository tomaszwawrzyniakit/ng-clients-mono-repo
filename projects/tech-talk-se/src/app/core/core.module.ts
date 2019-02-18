import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleDialogComponent } from '../event/components/schedule-dialog/schedule-dialog.component';
import { ScheduleDialogResolver } from '../event/components/schedule-dialog/schedule-dialog.resolver';
import { TalkOverviewDialogComponent } from '../event/components/talk-overview-dialog/talk-overview-dialog.component';
import { TalkOverviewDialogResolver } from '../event/components/talk-overview-dialog/talk-overview-dialog.resolver';
import { AutoClosableSidenavDirective } from './shell/auto-closable-sidenav.directive';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';

@NgModule({
  declarations: [
    ShellComponent,
    MenuFooterComponent,
    AutoClosableSidenavDirective],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ScheduleDialogComponent,
        resolve: {
          schedule: ScheduleDialogResolver
        }
      },
      {
        path: 'talks',
        component: TalkOverviewDialogComponent,
        resolve: {
          talks: TalkOverviewDialogResolver
        }
      },
      {path: '', redirectTo: '/', pathMatch: 'full'}
    ]),
  ],
  exports: [ShellComponent]
})
export class CoreModule {
}
