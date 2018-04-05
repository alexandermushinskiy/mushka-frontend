export class SupplierTablePreview {
  index: number;
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  webSite: string;
  contactPerson: string;
  paymentCondition: string;
  services: string;
  comments: string;
  className: string;

  private readonly defaultValue = ' - ';

  constructor(elem, index: number = 0) {
    this.index = index;
    this.id = elem.id;
    this.name = elem.name;
    this.address = elem.address;
    this.phone = elem.phone;
    this.email = elem.email || this.defaultValue;
    this.webSite = elem.webSite || this.defaultValue;
    this.contactPerson = elem.contactPerson;
    this.paymentCondition = elem.paymentCondition;
    this.services = elem.services;
    this.comments = elem.comments;
    this.className = elem.className || this.getClassName(index);
  }

  getClassName(index: number, isActive: boolean = false) {
    const isOdd = (index % 2 === 0);
    return `${isOdd ? 'odd' : 'even'} ${isActive ? 'active' : 'non-active'}`;
  }
}
