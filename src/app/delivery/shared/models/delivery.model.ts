export class Delivery {
  deliveryDate: string;
  batchNumber: string;
  supplier: string;
  cost: string;
  transferFee: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}