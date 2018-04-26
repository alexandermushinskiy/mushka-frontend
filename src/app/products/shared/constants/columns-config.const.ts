import { DatatableColumn } from '../../../shared/interfaces/datatable-column.interface';

export const columnsConfig: { [name: string]: DatatableColumn } = {
  'name': {
    name: 'Имя',
    prop: 'name',
    width: 200,
    canBeFiltered: true,
    cellTemplateName: 'nameCol'
  },
  'сode': {
    name: 'Артикул',
    prop: 'сode',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'сodeCol'
  },
  'createdOn': {
    name: 'Дата добавления',
    prop: 'createdOn',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'createdOnCol'
  },
  'deliveriesNumber': {
    name: 'Кол-во поставок',
    prop: 'deliveriesNumber',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'deliveriesCol'
  },
  'lastDeliveryDate': {
    name: 'Дата последней поставки',
    prop: 'lastDeliveryDate',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryDateCol'
  },
  'lastDeliveryCount': {
    name: 'Кол-во в последней поставке',
    prop: 'lastDeliveryCount',
    width: 100,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryCountCol'
  },
  'sizes': {
    name: 'Размеры',
    prop: 'sizes',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'sizesCol'
  },
  'totalCount': {
    name: 'Всего в наличие',
    prop: 'totalCount',
    width: 30,
    canBeFiltered: true,
    cellTemplateName: 'totalCol'
  }
}
