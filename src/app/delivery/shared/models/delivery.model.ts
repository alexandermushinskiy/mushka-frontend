import { ProductItem } from "./product-item.model";
import { ServiceItem } from "./service-item.model";
import { Supplier } from "../../../shared/models/supplier.model";
import { PaymentMethod } from "../enums/payment-method.enum";

export class Delivery {
  id: string;
  batchNumber: string;
  requestDate: string;
  deliveryDate: string;
  supplier: Supplier;
  paymentMethod: PaymentMethod;
  transferFee: number;
  deliveryCost: number;
  totalCost: number;
  products: ProductItem[];
  services: ServiceItem[];
  isDraft: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }
}