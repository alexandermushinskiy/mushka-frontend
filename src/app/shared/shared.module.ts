import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from 'ngx-datatable-with-ie-fix';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { LoadingScreenComponent } from './widgets/loading-screen/loading-screen.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { SearchFormComponent } from './widgets/search-form/search-form.component';
import { SizesLabelsComponent } from './widgets/sizes-labels/sizes-labels.component';
import { OptionsComponent } from './widgets/options/options.component';
import { PopoverComponent } from './widgets/popover/popover.component';
import { PopoverDirective } from './directives/popover.directive';
import { ClosePopoverOnClickOutsideDirective } from './directives/close-popover-on-click-outside.directive';
import { DashIfEmptyPipe } from './pipes/dash-if-empty.pipe';
import { PsaDatatableHeaderComponent } from './widgets/datatable/psa-datatable-header/psa-datatable-header.component';
import { DatetimepickerComponent } from './widgets/datetimepicker/datetimepicker.component';
import { CurrencyInputComponent } from './widgets/currency-input/currency-input.component';
import { DropdownComponent } from './widgets/dropdown/dropdown.component';
import { NumberFieldDirective } from './directives/number-field.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    CurrencyMaskModule,
    NgbModule.forRoot(),
    //NgxMyDatePickerModule.forRoot()
  ],
  declarations: [
    LoadingScreenComponent,
    SpinnerComponent,
    SearchFormComponent,
    SizesLabelsComponent,
    OptionsComponent,
    PopoverComponent,
    PopoverDirective,
    ClosePopoverOnClickOutsideDirective,
    NumberFieldDirective,
    DashIfEmptyPipe,
    PsaDatatableHeaderComponent,
    DatetimepickerComponent,
    CurrencyInputComponent,
    DropdownComponent
  ],
  exports: [
    /* Common modules */
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDatatableModule,
    /* Directives */
    PopoverDirective,
    ClosePopoverOnClickOutsideDirective,
    NumberFieldDirective,
    /* Pipes */
    DashIfEmptyPipe,
    /* Components */
    LoadingScreenComponent,
    SpinnerComponent,
    SearchFormComponent,
    SizesLabelsComponent,
    OptionsComponent,
    PsaDatatableHeaderComponent,
    DatetimepickerComponent,
    CurrencyInputComponent,
    DropdownComponent
  ]
})

export class SharedModule {
}
