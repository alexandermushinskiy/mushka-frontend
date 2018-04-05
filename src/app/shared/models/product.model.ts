import { SizeItem } from './size-item.model';
import { Category } from './category.model';

export class Product {
  id: string;
  name: string;
  code: string;
  category: Category;
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
