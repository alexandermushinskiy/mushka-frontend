import { TemplateRef } from '@angular/core';

export interface DatatableColumn {
  width: number;
  prop: string;
  canBeFiltered?: boolean;
  name?: string;
  exportProp?: string;
  cellTemplateName?: string;
  cellTemplate?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  sortable?: boolean;
  canAutoResize?: boolean;
  draggable?: boolean;
  resizeable?: boolean;
  headerCheckboxable?: boolean;
  checkboxable?: boolean;
  predefinedValues?: boolean;
}
