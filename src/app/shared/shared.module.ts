import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoadingScreenComponent } from './widgets/loading-screen/loading-screen.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    LoadingScreenComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingScreenComponent
  ]
})

export class SharedModule {
}
