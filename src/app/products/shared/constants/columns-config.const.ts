import { DatatableColumn } from '../../../shared/interfaces/datatable-column.interface';

export const columnsConfig: { [name: string]: DatatableColumn } = {
  'name': {
    name: 'Name',
    prop: 'name',
    width: 250,
    canBeFiltered: true,
    cellTemplateName: 'nameCol',
    predefinedValues: false
  }
}
