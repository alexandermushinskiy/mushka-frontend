export class SizeItem {
  constructor(public size: string,
              public amount: number = 0) {
  }

  getCssClass() {
    if (this.amount === 0 ) {
      return 'size-label-sold';
    }
    return this.amount > 10
      ? 'size-label'
      : 'size-label-ends';
  }

}
