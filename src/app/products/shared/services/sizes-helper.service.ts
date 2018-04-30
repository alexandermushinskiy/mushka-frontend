export class SizesHelperServices {
  private readonly sizesDelimiter = ';';

  convertToString(sizes: string[]): string {
    return !sizes
      ? ''
      : sizes.join(this.sizesDelimiter);
  }

  convertToArray(sizes: string): string[] {
    return !sizes
      ? []
      : sizes.split(this.sizesDelimiter).map(param => param.trim());
  }
  
}
