import { Component } from '@angular/core';

import { createNavigateCommandsOf } from '../../../components/summit-selection/summit-selection.component';
import { summits } from '../../../services/summit.service';

@Component({
  selector: 's19-wro-side-nav',
  templateUrl: './wro-side-nav.component.html',
  styleUrls: ['./wro-side-nav.component.scss']
})
export class WroSideNavComponent {
  summitScheduleNavigateCommands;

  constructor() {
    this.summitScheduleNavigateCommands = createNavigateCommandsOf(
      summits.ARCH_WRO
    );
  }
}
