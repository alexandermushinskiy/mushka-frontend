import { DataTablePreview } from '../../../shared/models/data-table-preview';

export class ProductTablePreview extends DataTablePreview {
  id: string;
  name: string;
  amount: number;
  costPerItem: number;
  totalCost: number;

  constructor(elem, index: number = 0) {
    super(elem, index);

    this.name = elem.name;
    this.amount = elem.amount;
    this.costPerItem = elem.costPerItem;
    this.totalCost = elem.totalCost;
  }
}
