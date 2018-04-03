export class Product {
  id: string;
  name: string;
  vendorCode: string;
  createdOn: string;
  deliveriesNumber: number;
  lastDeliveryDate: string;
  lastDeliveryCount: number;
  totalCount: number;
  sizes: string[];
  
  constructor(data: any) {
    Object.assign(this, data);
  }
}
