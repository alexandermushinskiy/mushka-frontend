import { DeliveryProductItem } from "./delivery-product-item";

export class Delivery {
  deliveryDate: string;
  batchNumber: string;
  supplier: string;
  cost: string;
  transferFee: string;
  products: DeliveryProductItem[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}