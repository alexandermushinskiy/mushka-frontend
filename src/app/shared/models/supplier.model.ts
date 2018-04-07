export class Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  webSite: string;
  contactPerson: string;
  paymentConditions: string;
  services: string;
  comments: string;
  createdOn: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
