import { BaseSchema } from 'yup';

function isRequired<Schema extends BaseSchema>(this: Schema, isRequired = true, msg?: string): Schema {
  return this.test({
    name: 'isRequired',
    exclusive: true,
    message: msg || 'This field is required.',
    test(value) {
      if (isRequired) {
        // array and string have custom logic
        if (this.schema.type === 'array') {
          return Array.isArray(value) ? value.length > 0 : value !== undefined;
        }
        if (this.schema.type === 'string') {
          return value !== undefined && value !== '';
        }
        // default logic for all other types
        return value !== undefined;
      }

      return true;
    },
  });
}

export default isRequired;
