import constants from '../constants/';

const {
  currencyNamePlural,
  currencySymbol,
} = constants;

export default function formatAmount(amount) {
  return `${currencySymbol}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${!currencySymbol ? currencyNamePlural : ''}`;
}
