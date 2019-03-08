import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SummitSelectionComponent } from '../summit/components/summit-selection/summit-selection.component';
import { SummitAppShellComponent } from '../summit/components/summit-app-shell/summit-app-shell.component';
import { ScheduleDialogComponent } from '../summit/components/schedule-dialog/schedule-dialog.component';
import { SwPushSubModule } from 'event-lib';
import { SideNavComponent } from '../summit/components/side-nav/side-nav.component';
import { ScheduleDialogResolver } from '../summit/components/schedule-dialog/schedule-dialog.resolver';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../summit/components/home/home.component';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule,
    SwPushSubModule.forRoot({
      vapidPublicKey: 'BB1ZDDVcnKwB-Pv4aXGB3WP6QmLdSPU6FNPJe9TBrhrajsXF0mLiaSFd7A7ZBfxhw5fUk42N435psrsKvz_Mgko',
      serverUri: 'api/subscription'
    }),
    RouterModule.forRoot([
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'summit-selection',
        component: SummitSelectionComponent
      },
      {
        path: ':summitName',
        component: SummitAppShellComponent,
        children: [
          {
            path: '',
            component: ScheduleDialogComponent,
            resolve: {
              schedule: ScheduleDialogResolver
            }
          },
          {
            path: ':summitName',
            component: SideNavComponent,
            outlet: 'sidenav'
          }
        ]
      }
    ])
  ]
})
export class CoreModule {
}
