import { base64, unbase64, toGlobalId, fromGlobalId } from '.';

describe('relay-id', () => {
  describe('base64', () => {
    it('encodes a simple string', () => {
      expect(base64('123')).toBe('MTIz');
    });

    it('encodes a string with special characters', () => {
      expect(base64('lksdnfkksdknsdc:123')).toBe('bGtzZG5ma2tzZGtuc2RjOjEyMw==');
    });

    it('encodes an empty string', () => {
      expect(base64('')).toBe('');
    });
  });

  describe('unbase64', () => {
    it('decodes a base64 string', () => {
      expect(unbase64('MTIz')).toBe('123');
    });

    it('decodes a padded base64 string', () => {
      expect(unbase64('bGtzZG5ma2tzZGtuc2RjOjEyMw==')).toBe('lksdnfkksdknsdc:123');
    });

    it('decodes an empty string', () => {
      expect(unbase64('')).toBe('');
    });

    it('roundtrips with base64', () => {
      const input = 'hello world!';
      expect(unbase64(base64(input))).toBe(input);
    });
  });

  describe('toGlobalId', () => {
    it('encodes type and string id', () => {
      expect(toGlobalId('User', '789')).toBe('VXNlcjo3ODk=');
    });

    it('encodes type and numeric id', () => {
      expect(toGlobalId('Article', 22)).toBe('QXJ0aWNsZToyMg==');
    });

    it('encodes with an empty string id', () => {
      expect(toGlobalId('User', '')).toBe(base64('User:'));
    });
  });

  describe('fromGlobalId', () => {
    it('decodes to type and id', () => {
      expect(fromGlobalId('VXNlcjo3ODk=')).toEqual({ type: 'User', id: '789' });
    });

    it('decodes numeric id as string', () => {
      expect(fromGlobalId('QXJ0aWNsZToyMg==')).toEqual({ type: 'Article', id: '22' });
    });

    it('handles id containing colons (uses first colon as type/id delimiter)', () => {
      const globalId = toGlobalId('Type', 'id:with:colons');
      expect(fromGlobalId(globalId)).toEqual({ type: 'Type', id: 'id:with:colons' });
    });

    it('handles empty id', () => {
      const globalId = toGlobalId('User', '');
      expect(fromGlobalId(globalId)).toEqual({ type: 'User', id: '' });
    });

    it('roundtrips with toGlobalId for string id', () => {
      const { type, id } = fromGlobalId(toGlobalId('Organization', '456'));
      expect(type).toBe('Organization');
      expect(id).toBe('456');
    });

    it('roundtrips with toGlobalId for numeric id', () => {
      const { type, id } = fromGlobalId(toGlobalId('Post', 99));
      expect(type).toBe('Post');
      expect(id).toBe('99');
    });
  });
});
