import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export const setAsDefault = 'SET_AS_DEFAULT';

@Component({
  selector: 's19-default-summit-dialog',
  templateUrl: './default-summit-dialog.component.html',
  styleUrls: ['./default-summit-dialog.component.scss']
})
export class DefaultSummitDialogComponent implements OnInit {
  setAsDefaultValue = setAsDefault;

  constructor(public dialogRef: MatDialogRef<DefaultSummitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
