import { ProductItem } from "./product-item.model";

export class Delivery {
  deliveryDate: string;
  batchNumber: string;
  supplier: string;
  cost: string;
  transferFee: string;
  products: ProductItem[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}