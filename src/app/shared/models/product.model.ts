import { SizeItem } from './size-item.model';

export class Product {
  id: string;
  name: string;
  code: string;
  createdOn: string;
  deliveriesNumber: number;
  lastDeliveryDate: string;
  lastDeliveryCount: number;
  totalCount: number;
  sizes: SizeItem[];
  
  constructor(data: any) {
    Object.assign(this, data);
  }
}
