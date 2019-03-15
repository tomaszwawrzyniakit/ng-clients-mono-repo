import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Summit, summits, SummitService } from '../../services/summit.service';
import { MatDialog } from '@angular/material';
import { DefaultSummitDialogComponent, setAsDefault } from '../default-summit-dialog/default-summit-dialog.component';

export function createNavigateCommandsOf(summit: Summit) {
  return [`/${summit.name}`];
}

export function navigateUsing(router: Router) {
  return {
    toScheduleOf(summit: Summit) {
      return router.navigate(createNavigateCommandsOf(summit));
    }
  };
}

@Component({
  selector: 's19-summit-selection',
  templateUrl: './summit-selection.component.html',
  styleUrls: ['./summit-selection.component.scss']
})
export class SummitSelectionComponent {
  readonly archWro = summits.ARCH_WRO;
  readonly archPnq = summits.ARCH_PNQ;
  readonly emFra = summits.EM_FRA;
  readonly emPnq = summits.EM_PNQ;

  constructor(private router: Router, public dialog: MatDialog, private summitService: SummitService) {
  }

  askIfSummitToBeSetAsDefault(summit: Summit) {
    const dialogRef = this.dialog.open(DefaultSummitDialogComponent, {
      width: '250px',
      data: {summit}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (setAsDefault === result) {
        this.summitService.storeSummit(summit);
      }
      navigateUsing(this.router).toScheduleOf(summit);
    });
  }
}
