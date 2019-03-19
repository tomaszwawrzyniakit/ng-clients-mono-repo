import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SummitSelectionComponent } from './components/summit-selection/summit-selection.component';
import { SummitAppShellComponent } from './components/summit-app-shell/summit-app-shell.component';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { EventLibModule, SwPushSubModule } from 'event-lib';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DefaultSummitDialogComponent } from './components/default-summit-dialog/default-summit-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { MenuFooterComponent } from './components/menu-footer/menu-footer.component';
import { WroSideNavComponent } from './arch-wro/components/wro-side-nav/wro-side-nav.component';
import { BuildingPlanComponent } from './components/building-plan/building-plan.component';
import { EmPnqSideNavComponent } from './em-png/components/em-pnq-side-nav/em-pnq-side-nav.component';
import { VenueComponent } from './components/venue/venue.component';

@NgModule({
  declarations: [
    SummitSelectionComponent,
    SummitAppShellComponent,
    ScheduleDialogComponent,
    SideNavComponent,
    DefaultSummitDialogComponent,
    HomeComponent,
    MenuFooterComponent,
    WroSideNavComponent,
    EmPnqSideNavComponent,
    VenueComponent,
    BuildingPlanComponent
  ],
  imports: [SharedModule, SwPushSubModule, EventLibModule],
  entryComponents: [DefaultSummitDialogComponent]
})
export class SummitModule {}
