import { BaseSchema } from 'yup';

const INTEGER_REGEX = /^\d*$/;

function npi<Schema extends BaseSchema>(this: Schema, msg?: string): Schema {
  return this.test({
    name: 'npi',
    exclusive: true,
    message: msg || 'This field is invalid.',
    test(value) {
      if (!value) return true;

      value += '';

      // is it a number and 10 digits long
      if (!INTEGER_REGEX.test(value) || value.length !== 10) {
        return false;
      }

      // is the first digit 1-4
      const firstDigit = value.charAt(0);
      if (['1', '2', '3', '4'].indexOf(firstDigit) < 0) {
        return false;
      }

      const digit = Number.parseInt(value.charAt(9), 10);
      value = value.substring(0, 9);
      value = `80840${value}`;

      let alternate = true;
      let total = 0;

      for (let i = value.length; i > 0; i--) {
        let next = Number.parseInt(value.charAt(i - 1), 10);
        if (alternate) {
          next *= 2;
          if (next > 9) {
            next = (next % 10) + 1;
          }
        }
        total += next;
        alternate = !alternate;
      }

      const roundUp = Math.ceil(total / 10) * 10;
      const calculatedCheck = roundUp - total;

      return calculatedCheck === digit;
    },
  });
}

export default npi;
