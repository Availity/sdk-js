import nativeForm from '..';
import flattenObject from '../src/flattenObject';

describe('nativeForm', () => {
  const complexObject = {
    a: { b: 'c', d: 1, e: ['f', 'g', 2, 3, { h: { i: 'j', k: [4, 'l'] } }] },
  };

  describe('flattenObject', () => {
    test('should return an object', () => {
      expect(
        Object.prototype.toString.call(flattenObject({ a: { b: 'c' } }))
      ).toBe('[object Object]');
    });
    describe('returned object', () => {
      let result;
      beforeEach(() => {
        result = flattenObject(complexObject);
      });
      test('should be 1 level deep', () => {
        Object.keys(result).forEach(key => {
          expect(Object.prototype.toString.call(result[key])).toBe(
            '[object String]'
          );
        });
      });
      test('should correctly represent the keys as dot notation', () => {
        const expected = {
          'a.b': 'c',
          'a.d': '1',
          'a.e[0]': 'f',
          'a.e[1]': 'g',
          'a.e[2]': '2',
          'a.e[3]': '3',
          'a.e[4].h.i': 'j',
          'a.e[4].h.k[0]': '4',
          'a.e[4].h.k[1]': 'l',
        };
        expect(result).toEqual(expected);
      });
    });
  });
  describe('default export', () => {
    beforeEach(() => {
      window.HTMLFormElement.prototype.submit = jest.fn();
    });

    afterEach(() => {
      const form = document.querySelector('form');
      if (form) form.remove();
    });
    test('spaceId is required', () => {
      expect(() => nativeForm()).toThrow(
        'spaceId is required and was not provided'
      );
    });

    test('create a form', () => {
      nativeForm('spaceId');
      expect(document.querySelector('form')).not.toBeNull();
    });

    describe('the form', () => {
      test('should be added to the body (to be able to be submitted)', () => {
        nativeForm('spaceId');
        expect(document.body.querySelector('form')).not.toBeNull();
      });

      test('action should have the space id in the URL by default', () => {
        nativeForm('spaceId123');
        expect(document.querySelector('form').getAttribute('action')).toBe(
          '/ms/api/availity/internal/spc/magneto/sso/v1/saml/spaceId123'
        );
      });

      test('action should be overridable', () => {
        nativeForm('spaceId123', {}, { action: '/my/url/here' });
        expect(document.querySelector('form').getAttribute('action')).toBe(
          '/my/url/here'
        );
      });

      test('action magneto integration type should be overridable', () => {
        nativeForm('spaceId123', {}, {}, 'openid');
        expect(document.querySelector('form').getAttribute('action')).toBe(
          '/ms/api/availity/internal/spc/magneto/sso/v1/openid/spaceId123'
        );
      });

      test('method should be post by default', () => {
        nativeForm('spaceId');
        expect(document.querySelector('form').getAttribute('method')).toBe(
          'post'
        );
      });

      test('method should be overridable', () => {
        nativeForm('spaceId123', {}, { method: 'get' });
        expect(document.querySelector('form').getAttribute('method')).toBe(
          'get'
        );
      });

      test('target should be _blank by default', () => {
        nativeForm('spaceId');
        expect(document.querySelector('form').getAttribute('target')).toBe(
          '_blank'
        );
      });

      test('target should be overridable', () => {
        nativeForm('spaceId123', {}, { target: '_top' });
        expect(document.querySelector('form').getAttribute('target')).toBe(
          '_top'
        );
      });

      test('addtional attributes can be defined', () => {
        nativeForm('spaceId123', {}, { id: 'myForm', class: 'my-form' });
        expect(document.querySelector('form').getAttribute('id')).toBe(
          'myForm'
        );
        expect(document.querySelector('form').getAttribute('class')).toBe(
          'my-form'
        );
      });

      test('should have no field if no data was provided', () => {
        nativeForm('spaceId123');
        expect(document.querySelector('input')).toBeNull();
      });

      test('should have fields if was provided', () => {
        nativeForm('spaceId123', { a: 'b' });
        expect(document.querySelector('input')).not.toBeNull();
      });

      describe('the fields', () => {
        test('should have a field for each piece of data (no more, no less)', () => {
          nativeForm('spaceId123', complexObject);
          expect(document.querySelectorAll('input').length).toBe(
            Object.keys(flattenObject(complexObject)).length
          );
        });

        test('the names will match the flat object, but have the array index value removed (the way the back-end likes it)', () => {
          // Note: this causes multiple fields to have the same name, so we have to account for that
          nativeForm('spaceId123', complexObject);
          const flat = flattenObject(complexObject);
          const count = {};
          Object.keys(flat).forEach(key => {
            const name = key.replace(/\[\d+\]/g, '[]');
            count[name] = count[name] || 0;
            expect(
              document.querySelectorAll(`[name="${name}"`)[count[name]]
            ).not.toBeNull();
            count[name] += 1;
          });
        });

        test('data should match the values within the object', () => {
          // Note: this causes multiple fields to have the same name, so we have to account for that
          nativeForm('spaceId123', complexObject);
          const flat = flattenObject(complexObject);
          const count = {};
          Object.keys(flat).forEach(key => {
            const name = key.replace(/\[\d+\]/g, '[]');
            count[name] = count[name] || 0;
            const value = flat[key];
            expect(
              document.querySelectorAll(`[name="${name}"`)[count[name]].value
            ).toBe(value);
            count[name] += 1;
          });
        });
      });
    });

    test('submit the form', () => {
      nativeForm('spaceId');
      expect(window.HTMLFormElement.prototype.submit).toHaveBeenCalled();
    });
  });
});
