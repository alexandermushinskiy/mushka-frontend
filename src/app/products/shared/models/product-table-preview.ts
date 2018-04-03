export class ProductTablePreview {
  index: number;
  id: string;
  name: string;
  className: string;

  constructor(elem, index: number = 0) {
    this.index = index;
    this.id = elem.id;
    this.name = elem.name;
    this.className = elem.className || this.getClassName(index);
  }

  getClassName(index: number, isActive: boolean = false) {
    const isOdd = (index % 2 === 0);
    return `${isOdd ? 'odd' : 'even'} ${isActive ? 'active' : 'non-active'}`;
  }
}
