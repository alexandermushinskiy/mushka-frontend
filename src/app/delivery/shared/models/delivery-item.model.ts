import { DeliveryType } from "../enums/delivery-type.enum";

export class DeliveryItem {
  // type: DeliveryType;
  // displayName: string;
  // data: any[];

  constructor(public type: DeliveryType,
              public displayName: string,
              public data: any[]) {
  }

  get amount(): number {
    return this.data.length;
  }
}
