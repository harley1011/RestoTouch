import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}
  transform(array: any[], query: any, searchBy: string): any {

    if (searchBy === 'Paid Date') {
      return _.filter(array, row=>this.datePipe.transform(row.createdAt, 'short').indexOf(query) > -1);
    }

    if (query) {
      return _.filter(array, row=>row.id === query);
    }

    return array;
  }
}
