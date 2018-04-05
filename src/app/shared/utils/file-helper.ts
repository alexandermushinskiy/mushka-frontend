import * as FileSaver from 'file-saver';

export class FileHelper {
  static toCSVFormat(fileName: string, data: any[], order: string[] = []) {
    if (!data.length) {
      return;
    }
    const keys = order.length ? order : Object.keys(data[0]);
    const csvString: string = data.reduce((csv: string, row: Object) =>
      `${csv}${keys.reduce((rowCsv: string, key: string) => `${rowCsv}${FileHelper.toValidCSVValue(row[key])},`, '')}\n`
    , '');

    const file = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(file, `${fileName}.csv`);
  }

  private static isValidType(value) {
    return value !== undefined && value !== Object(value);
  }

  private static toValidCSVValue(value) {
    if (!FileHelper.isValidType(value)) {
      return '';
    }

    if (typeof value === 'string') {
      return `"${value}"`;
    }

    return value;
  }
}
