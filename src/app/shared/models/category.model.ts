export class Category {
  id: string;
  name: string;
  sizes: string[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}
