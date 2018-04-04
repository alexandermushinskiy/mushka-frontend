import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from 'ngx-datatable-with-ie-fix';

import { LoadingScreenComponent } from './widgets/loading-screen/loading-screen.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { SearchFormComponent } from './widgets/search-form/search-form.component';
import { SizesLabelsComponent } from './widgets/sizes-labels/sizes-labels.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule.forRoot(),
    //NgxMyDatePickerModule.forRoot()
  ],
  declarations: [
    LoadingScreenComponent,
    SpinnerComponent,
    SearchFormComponent,
    SizesLabelsComponent
  ],
  exports: [
    /* Common modules */
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDatatableModule,
    //NgxMyDatePickerModule,
    /* Components */
    LoadingScreenComponent,
    SpinnerComponent,
    SearchFormComponent,
    SizesLabelsComponent
  ]
})

export class SharedModule {
}
