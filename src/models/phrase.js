import { Model } from 'objection';

export default class Transaction extends Model {
  static get tableName() {
    return 'phrases';
  }
}
