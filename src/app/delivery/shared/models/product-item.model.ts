import { Product } from '../../../shared/models/product.model';

export class ProductItem {
  //id: string;
  product: Product;
  amount: number;
  costPerItem: number;
  totalCost: number;
  notes: string;

  constructor(data: any) {
    Object.assign(this, data);
    this.totalCost = this.costPerItem * this.amount;
  }
}
