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

    it('handles id containing colons', () => {
      const globalId = toGlobalId('Type', 'id:with:colons');
      const decoded = fromGlobalId(globalId);
      expect(decoded).toEqual({ type: 'Type', id: 'id:with:colons' });
    });

    it('handles empty id', () => {
      const globalId = toGlobalId('User', '');
      const decoded = fromGlobalId(globalId);
      expect(decoded).toEqual({ type: 'User', id: '' });
    });
  });

  describe('fromGlobalId', () => {
    it('decodes to type and id', () => {
      expect(fromGlobalId('VXNlcjo3ODk=')).toEqual({ type: 'User', id: '789' });
    });

    it('decodes numeric id as string', () => {
      expect(fromGlobalId('QXJ0aWNsZToyMg==')).toEqual({ type: 'Article', id: '22' });
    });

    it('handles id with colons correctly (uses first colon as delimiter)', () => {
      const globalId = toGlobalId('Node', 'a:b:c');
      const result = fromGlobalId(globalId);
      expect(result.type).toBe('Node');
      expect(result.id).toBe('a:b:c');
    });

    it('roundtrips with toGlobalId', () => {
      const { type, id } = fromGlobalId(toGlobalId('Organization', '456'));
      expect(type).toBe('Organization');
      expect(id).toBe('456');
    });
  });
});
