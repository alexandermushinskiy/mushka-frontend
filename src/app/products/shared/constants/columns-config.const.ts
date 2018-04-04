import { DatatableColumn } from '../../../shared/interfaces/datatable-column.interface';

export const columnsConfig: { [name: string]: DatatableColumn } = {
  'name': {
    name: 'Имя',
    prop: 'name',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'nameCol',
    predefinedValues: false
  },
  'сode': {
    name: 'Артикул',
    prop: 'сode',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'сodeCol',
    predefinedValues: false
  },
  'createdOn': {
    name: 'Дата добавления',
    prop: 'createdOn',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'createdOnCol',
    predefinedValues: false
  },
  'deliveriesNumber': {
    name: 'Кол-во поставок',
    prop: 'deliveriesNumber',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'deliveriesCol',
    predefinedValues: false
  },
  'lastDeliveryDate': {
    name: 'Дата последней поставки',
    prop: 'lastDeliveryDate',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryDateCol',
    predefinedValues: false
  },
  'lastDeliveryCount': {
    name: 'Кол-во в последней поставке',
    prop: 'lastDeliveryCount',
    width: 100,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryCountCol',
    predefinedValues: false
  },
  'sizes': {
    name: 'Размеры',
    prop: 'sizes',
    width: 150,
    canBeFiltered: true,
    cellTemplateName: 'sizesCol',
    predefinedValues: false
  },
  'totalCount': {
    name: 'Всего в наличие',
    prop: 'totalCount',
    width: 30,
    canBeFiltered: true,
    cellTemplateName: 'totalCol',
    predefinedValues: false
  }
}
