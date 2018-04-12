import { ProductItem } from "./product-item.model";
import { ServiceItem } from "./service-item.model";
import { Supplier } from "../../../shared/models/supplier.model";

export class Delivery {
  id: string;
  batchNumber: string;
  requestDate: string;
  deliveryDate: string;
  supplier: Supplier;
  paymentMethod: string;
  transferFee: number;
  deiveryCost: number;
  totalCost: number;
  products: ProductItem[];
  services: ServiceItem[];
  isDraft: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }
}