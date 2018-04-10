import { DatatableColumn } from '../../../shared/interfaces/datatable-column.interface';

export const columnsConfig: { [name: string]: DatatableColumn } = {
  'name': {
    name: 'Наименование',
    prop: 'name',
    width: 250,
    canBeFiltered: true,
    cellTemplateName: 'nameCol',
    predefinedValues: false
  },
  'amount': {
    name: 'Количество',
    prop: 'amount',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'amountCol',
    predefinedValues: false
  },
  'costPerItem': {
    name: 'Стоимость за единицу',
    prop: 'costPerItem',
    width: 130,
    canBeFiltered: true,
    cellTemplateName: 'costPerItemCol',
    predefinedValues: false
  },
  'totalCost': {
    name: 'Общая стоимость',
    prop: 'totalCost',
    width: 130,
    canBeFiltered: true,
    cellTemplateName: 'totalCostCol',
    predefinedValues: false
  }
}
