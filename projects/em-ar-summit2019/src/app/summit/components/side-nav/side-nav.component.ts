import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createNavigateCommandsOf } from '../summit-selection/summit-selection.component';
import { summits } from '../../services/summit.service';

@Component({
  selector: 's19-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  summitScheduleNavigateCommands;

  constructor(route: ActivatedRoute) {
    const summitName = route.snapshot.params['summitName'];
    const summit = (summitName && summits.fromName(summitName)) || summits.ARCH_WRO;
    this.summitScheduleNavigateCommands = createNavigateCommandsOf(summit);
  }
}
