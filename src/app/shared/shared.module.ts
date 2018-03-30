import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoadingScreenComponent } from './widgets/loading-screen/loading-screen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    LoadingScreenComponent
  ],
  exports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingScreenComponent
  ]
})

export class SharedModule {
}
