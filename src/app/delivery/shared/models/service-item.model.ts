export class ServiceItem {
  id: string;
  name: string;
  cost: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
