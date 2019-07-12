import * as yup from 'yup';
import '..';

describe('date', () => {
  test('should validate', async () => {
    const schema = yup
      .object()
      .shape({
        startDate: yup.string().isRequired(),
        endDate: yup.string().isRequired(),
      })
      .dateRange({
        min: '12/10/2012',
        max: '12/13/2012',
      });

    const valid = await schema.isValid({
      startDate: '12/11/2012',
      endDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });

  test('should work with custom value keys', async () => {
    const schema = yup
      .object()
      .shape({
        helloDate: yup.string().isRequired(),
        worldDate: yup.string().isRequired(),
      })
      .dateRange({
        min: '12/10/2012',
        max: '12/13/2012',
        start: 'helloDate',
        end: 'worldDate',
      });

    const valid = await schema.isValid({
      helloDate: '12/11/2012',
      worldDate: '12/12/2012',
    });

    expect(valid).toBe(true);
  });
});
