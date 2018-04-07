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
  'address': {
    name: 'Адрес',
    prop: 'address',
    width: 50,
    canBeFiltered: true,
    cellTemplateName: 'addressCol',
    predefinedValues: false
  },
  'phone': {
    name: 'Телефон',
    prop: 'phone',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'phoneCol',
    predefinedValues: false
  },
  'email': {
    name: 'Эл. почта',
    prop: 'email',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'emailCol',
    predefinedValues: false
  },
  'webSite': {
    name: 'Веб сайт',
    prop: 'webSite',
    width: 70,
    canBeFiltered: true,
    cellTemplateName: 'webSiteCol',
    predefinedValues: false
  },
  'contactPerson': {
    name: 'Контактное лицо',
    prop: 'contactPerson',
    width: 100,
    canBeFiltered: true,
    cellTemplateName: 'contactPersonCol',
    predefinedValues: false
  },
  'paymentConditions': {
    name: 'Условия оплаты',
    prop: 'paymentConditions',
    width: 150,
    canBeFiltered: true,
    cellTemplateName: 'paymentConditionsCol',
    predefinedValues: false
  },
  'services': {
    name: 'Список услуги',
    prop: 'services',
    width: 30,
    canBeFiltered: true,
    cellTemplateName: 'servicesCol',
    predefinedValues: false
  }
}
