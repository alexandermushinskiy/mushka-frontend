export class Supplier {
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
  
  constructor(data: any) {
    Object.assign(this, data);
  }
}
