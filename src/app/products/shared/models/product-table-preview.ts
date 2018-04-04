import { SizeItem } from '../../../shared/models/size-item.model';

export class ProductTablePreview {
  index: number;
  id: string;
  name: string;
  сode: string;
  createdOn: string;
  deliveriesNumber: number;
  lastDeliveryDate: string;
  lastDeliveryCount: number;
  totalCount: number;
  sizes: SizeItem[];
  className: string;

  constructor(elem, index: number = 0) {
    this.index = index;
    this.id = elem.id;
    this.name = elem.name;
    this.сode = elem.сode;
    this.createdOn = elem.createdOn;
    this.deliveriesNumber = elem.deliveriesNumber;
    this.lastDeliveryDate = elem.lastDeliveryDate;
    this.lastDeliveryCount = elem.lastDeliveryCount;
    this.totalCount = elem.totalCount;
    this.sizes = elem.sizes;
    this.className = elem.className || this.getClassName(index);
  }

  getClassName(index: number, isActive: boolean = false) {
    const isOdd = (index % 2 === 0);
    return `${isOdd ? 'odd' : 'even'} ${isActive ? 'active' : 'non-active'}`;
  }
}
