import {
  helper
} from '@ember/component/helper';
import {
  get
} from '@ember/object';

export function findOptionBy([collection, attrName, attrValue]) {
  return collection.find(el => get(el, attrName) === attrValue);
}

export default helper(findOptionBy);