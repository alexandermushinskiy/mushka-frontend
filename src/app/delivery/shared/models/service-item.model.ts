export class ServiceItem {
  id: string;
  name: string;
  cost: number;
  notes: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
