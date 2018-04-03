import { DatatableColumn } from '../../../shared/interfaces/datatable-column.interface';

export const columnsConfig: { [name: string]: DatatableColumn } = {
  'name': {
    name: 'Name',
    prop: 'name',
    width: 250,
    canBeFiltered: true,
    cellTemplateName: 'nameCol',
    predefinedValues: false
  },
  'vendorCode': {
    name: 'Vendor Code',
    prop: 'vendorCode',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'vendorCodeCol',
    predefinedValues: false
  },
  'createdOn': {
    name: 'Created On',
    prop: 'createdOn',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'createdOnCol',
    predefinedValues: false
  },
  'deliveriesNumber': {
    name: 'Deliveries No',
    prop: 'deliveriesNumber',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'deliveriesCol',
    predefinedValues: false
  },
  'lastDeliveryDate': {
    name: 'Last Delivery Date',
    prop: 'lastDeliveryDate',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryDateCol',
    predefinedValues: false
  },
  'lastDeliveryCount': {
    name: 'Last Delivery Count',
    prop: 'lastDeliveryCount',
    width: 100,
    canBeFiltered: true,
    cellTemplateName: 'lastDeliveryCountCol',
    predefinedValues: false
  },
  'totalCount': {
    name: 'Total',
    prop: 'totalCount',
    width: 250,
    canBeFiltered: true,
    cellTemplateName: 'totalCol',
    predefinedValues: false
  },
  'sizes': {
    name: 'Sizes',
    prop: 'sizes',
    width: 250,
    canBeFiltered: true,
    cellTemplateName: 'sizesCol',
    predefinedValues: false
  },
}
