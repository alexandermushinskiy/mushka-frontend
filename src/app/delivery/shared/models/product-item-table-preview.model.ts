import { DataTablePreview } from '../../../shared/models/data-table-preview';

export class ProductItemTablePreview extends DataTablePreview {
  id: string;
  name: string;
  amount: number;
  costPerItem: number;
  totalCost: number;
  notes: string;

  constructor(elem, index: number = 0) {
    super(elem, index);

    this.name = elem.product.name;
    this.amount = elem.amount;
    this.costPerItem = elem.costPerItem;
    this.totalCost = elem.totalCost;
    this.notes = elem.notes;
  }
}
