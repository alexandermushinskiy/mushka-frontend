import { DataTablePreview } from "../../../shared/models/data-table-preview";

export class SupplierTablePreview extends DataTablePreview {
  name: string;
  address: string;
  phone: string;
  email: string;
  webSite: string;
  contactPerson: string;
  paymentCondition: string;
  services: string;
  comments: string;

  constructor(elem, index: number = 0) {
    super(elem, index);

    this.name = elem.name;
    this.address = elem.address;
    this.phone = elem.phone;
    this.email = elem.email || this.defaultValue;
    this.webSite = elem.webSite || this.defaultValue;
    this.contactPerson = elem.contactPerson;
    this.paymentCondition = elem.paymentCondition;
    this.services = elem.services;
    this.comments = elem.comments;
  }
}
