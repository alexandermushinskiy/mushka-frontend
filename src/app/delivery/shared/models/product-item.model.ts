export class ProductItem {
  id: string;
  name: string;
  amount: number;
  costPerItem: number;
  totalCost: number;

  constructor(data: any) {
    Object.assign(this, data);
    this.totalCost = this.costPerItem * this.amount;
  }
}
