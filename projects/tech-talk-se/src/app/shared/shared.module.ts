import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from './ng-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [CommonModule, NgMaterialModule]
})
export class SharedModule {
}
