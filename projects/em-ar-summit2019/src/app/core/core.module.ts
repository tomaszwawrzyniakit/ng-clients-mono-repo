import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SummitSelectionComponent } from '../summit/components/summit-selection/summit-selection.component';
import { SummitAppShellComponent } from '../summit/components/summit-app-shell/summit-app-shell.component';
import { ScheduleDialogComponent } from '../summit/components/schedule-dialog/schedule-dialog.component';
import { SwPushSubModule } from 'event-lib';
import { SideNavComponent } from '../summit/components/side-nav/side-nav.component';
import { ScheduleDialogResolver } from '../summit/components/schedule-dialog/schedule-dialog.resolver';
import { HomeComponent } from '../summit/components/home/home.component';
import { BuildingPlanComponent } from '../summit/components/building-plan/building-plan.component';
import { WroSideNavComponent } from '../summit/arch-wro/components/wro-side-nav/wro-side-nav.component';
import { EmPnqSideNavComponent } from '../summit/em-png/components/em-pnq-side-nav/em-pnq-side-nav.component';
import { VenueComponent } from '../summit/components/venue/venue.component';
import { VenueDialogResolver } from '../summit/components/venue/venue-dialog.resolver';

const scheduleDialogRoute = {
  path: '',
  component: ScheduleDialogComponent,
  resolve: {
    schedule: ScheduleDialogResolver
  }
};
const venueRoute = {
  path: 'venue',
  resolve: {
    venue: VenueDialogResolver
  },
  component: VenueComponent
};
@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule,
    SwPushSubModule.forRoot({
      vapidPublicKey:
        'BB1ZDDVcnKwB-Pv4aXGB3WP6QmLdSPU6FNPJe9TBrhrajsXF0mLiaSFd7A7ZBfxhw5fUk42N435psrsKvz_Mgko',
      serverUri: 'api/subscription'
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'summit-selection',
        component: SummitSelectionComponent
      },
      {
        path: '',
        component: SummitAppShellComponent,
        children: [
          {
            path: 'arch-wro',
            children: [
              scheduleDialogRoute,
              venueRoute,
              {
                path: '',
                component: WroSideNavComponent,
                outlet: 'sidenav'
              },
              {
                path: 'building-plan',
                component: BuildingPlanComponent,
                data: {
                  imgSrc: 'assets/arch-wro/room-plan-wro.png',
                  backgroundColor: '#622e6b'
                }
              }
            ]
          },
          {
            path: 'em-pnq',
            children: [
              scheduleDialogRoute,
              venueRoute,
              {
                path: '',
                component: EmPnqSideNavComponent,
                outlet: 'sidenav',
                data: {
                  feedBackUrl: 'https://www.capgemini.com/'
                }
              },
              {
                path: 'building-plan',
                component: BuildingPlanComponent,
                data: {
                  imgSrc: 'assets/em-pnq/meeting-room-location-pnq.png',
                  backgroundColor: '#ffffff'
                }
              }
            ]
          },
          {
            path: ':summitName',
            children: [
              scheduleDialogRoute,
              {
                path: '',
                component: SideNavComponent,
                outlet: 'sidenav'
              }
            ]
          }
        ]
      }
    ])
  ]
})
export class CoreModule {}
