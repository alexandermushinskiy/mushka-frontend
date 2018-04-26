export class Category {
  id: string;
  name: string;
  sizes: string[];
  isSizesRequired: boolean;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
