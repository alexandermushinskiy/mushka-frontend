import { DataTablePreview } from '../../../shared/models/data-table-preview';

export class ServiceItemTablePreview extends DataTablePreview {
  id: string;
  name: string;
  cost: number;

  constructor(elem, index: number = 0) {
    super(elem, index);

    this.name = elem.name;
    this.cost = elem.cost;
  }
}