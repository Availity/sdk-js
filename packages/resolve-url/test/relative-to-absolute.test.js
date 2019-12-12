import { removeDotSegments, resolve } from '../src/relative-to-absolute';

describe('#resolve', () => {
  it('create an IRI from an absolute IRI when no baseIRI is given', () => {
    expect(resolve('http://example.org/')).toEqual('http://example.org/');
  });

  it('create an IRI from an absolute IRI when the baseIRI is empty', () => {
    expect(resolve('http://example.org/', '')).toEqual('http://example.org/');
  });

  it('create an IRI from an absolute IRI when a baseIRI is given', () => {
    expect(resolve('http://example.org/', 'http://base.org/')).toEqual(
      'http://example.org/'
    );
  });

  it('create an IRI from the baseIRI when given value is empty', () => {
    expect(resolve('', 'http://base.org/')).toEqual('http://base.org/');
  });

  it('create an IRI from a relative IRI when no baseIRI is given', () => {
    expect(resolve('abc')).toEqual('abc');
  });

  it('create an IRI from a relative IRI without dot segments when no baseIRI is given', () => {
    expect(resolve('http://abc/../../')).toEqual('http://abc/');
  });

  it('create an IRI from a relative IRI when a baseIRI is given', () => {
    expect(resolve('abc', 'http://base.org/')).toEqual('http://base.org/abc');
  });

  it('create an IRI from a relative IRI when a baseIRI is given and ignore the baseIRI fragment', () => {
    expect(resolve('abc', 'http://base.org/#frag')).toEqual(
      'http://base.org/abc'
    );
  });

  it('create an IRI from a hash', () => {
    expect(resolve('#abc', 'http://base.org/')).toEqual('http://base.org/#abc');
  });

  it('create an IRI and ignore the baseIRI if the value contains a colon', () => {
    expect(resolve('http:abc', 'http://base.org/')).toEqual('http:abc');
  });

  it('create an IRI and ignore the baseIRI if the value contains a colon, and remove dot segments', () => {
    expect(resolve('http://abc/../../', 'http://base.org/')).toEqual(
      'http://abc/'
    );
  });

  it('error for a non-absolute baseIRI', () => {
    expect(() => resolve('abc', 'def')).toThrow();
  });

  it('create an IRI that has the baseIRI scheme if the value starts with //', () => {
    expect(resolve('//abc', 'http://base.org/')).toEqual('http://abc');
  });

  it('create an IRI from a baseIRI without a / in the path', () => {
    expect(resolve('abc', 'http://base.org')).toEqual('http://base.org/abc');
  });

  it('create an IRI from a baseIRI without a / in the path, and remove dot segments', () => {
    expect(resolve('abc/./', 'http://base.org')).toEqual(
      'http://base.org/abc/'
    );
  });

  it('create an IRI from the baseIRI scheme when the baseIRI contains only ://', () => {
    expect(resolve('abc', 'http://')).toEqual('http:abc');
  });

  it('create an IRI from the baseIRI scheme when the baseIRI contains only ://, and remove dot segments', () => {
    expect(resolve('abc/./', 'http://')).toEqual('http:abc/');
  });

  it('create an IRI from the baseIRI if something other than a / follows the :', () => {
    expect(resolve('abc', 'http:a')).toEqual('http:a/abc');
  });

  it('create an IRI from the baseIRI if something other than a / follows the :, and remove dot segments', () => {
    expect(resolve('abc/./', 'http:a')).toEqual('http:a/abc/');
  });

  it('create an IRI from the baseIRI scheme if nothing follows the :', () => {
    expect(resolve('abc', 'http:')).toEqual('http:abc');
  });

  it('create an IRI from the baseIRI scheme if nothing follows the :, and remove dot segments', () => {
    expect(resolve('abc/./', 'http:')).toEqual('http:abc/');
  });

  it('create an IRI from an absolute path and ignore the path from the base IRI', () => {
    expect(resolve('/abc/def/', 'http://base.org/123/456/')).toEqual(
      'http://base.org/abc/def/'
    );
  });

  it('create an IRI from a baseIRI with http:// and ignore everything after the last slash', () => {
    expect(resolve('xyz', 'http://aa/a')).toEqual('http://aa/xyz');
  });

  it('create an IRI from a baseIRI with http:// and collapse parent paths', () => {
    expect(resolve('xyz', 'http://aa/parent/parent/../../a')).toEqual(
      'http://aa/xyz'
    );
  });

  it('create an IRI from a baseIRI with http:// and remove current-dir paths', () => {
    expect(resolve('xyz', 'http://aa/././a')).toEqual('http://aa/xyz');
  });

  it('create an IRI from a baseIRI and .', () => {
    expect(resolve('.', 'http://aa/')).toEqual('http://aa/');
  });

  it('create an IRI from a baseIRI and ..', () => {
    expect(resolve('..', 'http://aa/b/')).toEqual('http://aa/');
  });

  it('create an IRI from a baseIRI and ../', () => {
    expect(resolve('../', 'http://aa/b/')).toEqual('http://aa/');
  });

  it('create an IRI from a baseIRI without ending slash and ..', () => {
    expect(resolve('..', 'http://aa/b')).toEqual('http://aa/');
  });

  it('create an IRI from a baseIRI without ending slash and ../', () => {
    expect(resolve('../', 'http://aa/b')).toEqual('http://aa/');
  });

  it('create an IRI from a baseIRI without ending slash and ?a=b', () => {
    expect(resolve('?a=b', 'http://abc/def/ghi')).toEqual(
      'http://abc/def/ghi?a=b'
    );
  });

  it('create an IRI from a baseIRI without ending slash and .?a=b', () => {
    expect(resolve('.?a=b', 'http://abc/def/ghi')).toEqual(
      'http://abc/def/?a=b'
    );
  });

  it('create an IRI from a baseIRI without ending slash and ..?a=b', () => {
    expect(resolve('..?a=b', 'http://abc/def/ghi')).toEqual('http://abc/?a=b');
  });

  it('create an IRI from a baseIRI without ending slash and xyz', () => {
    expect(resolve('xyz', 'http://abc/d:f/ghi')).toEqual('http://abc/d:f/xyz');
  });

  it('create an IRI from a baseIRI without ending slash and ./xyz', () => {
    expect(resolve('./xyz', 'http://abc/d:f/ghi')).toEqual(
      'http://abc/d:f/xyz'
    );
  });

  it('create an IRI from a baseIRI without ending slash and ../xyz', () => {
    expect(resolve('../xyz', 'http://abc/d:f/ghi')).toEqual('http://abc/xyz');
  });

  it('create an IRI from a relative IRI with : and ignore the baseIRI', () => {
    expect(resolve('g:h', 'file:///a/bb/ccc/d;p?q')).toEqual('g:h');
  });

  it('create an IRI from a simple relative IRI and complex baseIRI', () => {
    expect(resolve('g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g'
    );
  });

  it('create an IRI from a ./g relative IRI and complex baseIRI', () => {
    expect(resolve('./g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g'
    );
  });

  it('create an IRI from a g/ relative IRI and complex baseIRI', () => {
    expect(resolve('g/', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g/'
    );
  });

  it('create an IRI from a /g relative IRI and complex baseIRI', () => {
    expect(resolve('/g', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///g');
  });

  it('create an IRI from a //g relative IRI and complex baseIRI', () => {
    expect(resolve('//g', 'file:///a/bb/ccc/d;p?q')).toEqual('file://g');
  });

  it('create an IRI from a ?y relative IRI and complex baseIRI', () => {
    expect(resolve('?y', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/d;p?y'
    );
  });

  it('create an IRI from a g?y relative IRI and complex baseIRI', () => {
    expect(resolve('g?y', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g?y'
    );
  });

  it('create an IRI from a #s relative IRI and complex baseIRI', () => {
    expect(resolve('#s', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/d;p?q#s'
    );
  });

  it('create an IRI from a g#s relative IRI and complex baseIRI', () => {
    expect(resolve('g#s', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g#s'
    );
  });

  it('create an IRI from a g?y#s relative IRI and complex baseIRI', () => {
    expect(resolve('g?y#s', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g?y#s'
    );
  });

  it('create an IRI from a ;x relative IRI and complex baseIRI', () => {
    expect(resolve(';x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/;x'
    );
  });

  it('create an IRI from a g;x relative IRI and complex baseIRI', () => {
    expect(resolve('g;x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g;x'
    );
  });

  it('create an IRI from a g;x?y#s relative IRI and complex baseIRI', () => {
    expect(resolve('g;x?y#s', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g;x?y#s'
    );
  });

  it('create an IRI from an empty relative IRI and complex baseIRI', () => {
    expect(resolve('', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/d;p?q'
    );
  });

  it('create an IRI from a . relative IRI and complex baseIRI', () => {
    expect(resolve('.', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/bb/ccc/');
  });

  it('create an IRI from a ./ relative IRI and complex baseIRI', () => {
    expect(resolve('./', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/'
    );
  });

  it('create an IRI from a .. relative IRI and complex baseIRI', () => {
    expect(resolve('..', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/bb/');
  });

  it('create an IRI from a ../ relative IRI and complex baseIRI', () => {
    expect(resolve('../', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/bb/');
  });

  it('create an IRI from a ../g relative IRI and complex baseIRI', () => {
    expect(resolve('../g', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/bb/g');
  });

  it('create an IRI from a ../.. relative IRI and complex baseIRI', () => {
    expect(resolve('../..', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/');
  });

  it('create an IRI from a ../../ relative IRI and complex baseIRI', () => {
    expect(resolve('../../', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/');
  });

  it('create an IRI from a ../../g relative IRI and complex baseIRI', () => {
    expect(resolve('../../g', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///a/g');
  });

  it('create an IRI from a ../../.. relative IRI and complex baseIRI', () => {
    expect(resolve('../../..', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///');
  });

  it('create an IRI from a ../../../ relative IRI and complex baseIRI', () => {
    expect(resolve('../../../', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///');
  });

  it('create an IRI from a ../../../g relative IRI and complex baseIRI', () => {
    expect(resolve('../../../g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///g'
    );
  });

  it('create an IRI from a ../../../../g relative IRI and complex baseIRI', () => {
    expect(resolve('../../../../g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///g'
    );
  });

  it('create an IRI from a /./g relative IRI and complex baseIRI', () => {
    expect(resolve('/./g', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///g');
  });

  it('create an IRI from a /../g relative IRI and complex baseIRI', () => {
    expect(resolve('/../g', 'file:///a/bb/ccc/d;p?q')).toEqual('file:///g');
  });

  it('create an IRI from a g. relative IRI and complex baseIRI', () => {
    expect(resolve('g.', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g.'
    );
  });

  it('create an IRI from a .g relative IRI and complex baseIRI', () => {
    expect(resolve('.g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/.g'
    );
  });

  it('create an IRI from a g.. relative IRI and complex baseIRI', () => {
    expect(resolve('g..', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g..'
    );
  });

  it('create an IRI from a ..g relative IRI and complex baseIRI', () => {
    expect(resolve('..g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/..g'
    );
  });

  it('create an IRI from a ./../g relative IRI and complex baseIRI', () => {
    expect(resolve('./../g', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/g'
    );
  });

  it('create an IRI from a ./g/. relative IRI and complex baseIRI', () => {
    expect(resolve('./g/.', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g/'
    );
  });

  it('create an IRI from a g/./h relative IRI and complex baseIRI', () => {
    expect(resolve('g/./h', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g/h'
    );
  });

  it('create an IRI from a g/../h relative IRI and complex baseIRI', () => {
    expect(resolve('g/../h', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/h'
    );
  });

  it('create an IRI from a g;x=1/./y relative IRI and complex baseIRI', () => {
    expect(resolve('g;x=1/./y', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g;x=1/y'
    );
  });

  it('create an IRI from a g;x=1/../y relative IRI and complex baseIRI', () => {
    expect(resolve('g;x=1/../y', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/y'
    );
  });

  it('create an IRI from a g?y/./x relative IRI and complex baseIRI', () => {
    expect(resolve('g?y/./x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g?y/./x'
    );
  });

  it('create an IRI from a g?y/../x relative IRI and complex baseIRI', () => {
    expect(resolve('g?y/../x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g?y/../x'
    );
  });

  it('create an IRI from a g#s/./x relative IRI and complex baseIRI', () => {
    expect(resolve('g#s/./x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g#s/./x'
    );
  });

  it('create an IRI from a g#s/../x relative IRI and complex baseIRI', () => {
    expect(resolve('g#s/../x', 'file:///a/bb/ccc/d;p?q')).toEqual(
      'file:///a/bb/ccc/g#s/../x'
    );
  });

  it('create an IRI from a http:g relative IRI and complex baseIRI', () => {
    expect(resolve('http:g', 'file:///a/bb/ccc/d;p?q')).toEqual('http:g');
  });

  it('create an IRI from a //example.org/.././useless/../../scheme-relative relative IRI and complex baseIRI', () => {
    expect(
      resolve(
        '//example.org/.././useless/../../scheme-relative',
        'http://example.com/some/deep/directory/and/file#with-a-fragment'
      )
    ).toEqual('http://example.org/scheme-relative');
  });
});

describe('#removeDotSegments', () => {
  it('should handle a path without slashes', () => {
    expect(removeDotSegments('abc')).toEqual('/abc');
  });

  it('should handle a path with a single slash', () => {
    expect(removeDotSegments('abc/')).toEqual('/abc/');
  });

  it('should handle a path with a single slash at the start', () => {
    expect(removeDotSegments('/abc')).toEqual('/abc');
  });

  it('should handle a path with a slash at the start and end', () => {
    expect(removeDotSegments('/abc/')).toEqual('/abc/');
  });

  it('should handle a /.', () => {
    expect(removeDotSegments('/.')).toEqual('/');
  });

  it('should handle a /..', () => {
    expect(removeDotSegments('/..')).toEqual('/');
  });

  it('should handle a parent directory', () => {
    expect(removeDotSegments('/abc/..')).toEqual('/');
  });

  it('should handle a current directory', () => {
    expect(removeDotSegments('/abc/.')).toEqual('/abc/');
  });

  it('should handle an inbetween parent directory', () => {
    expect(removeDotSegments('/abc/../def/')).toEqual('/def/');
  });

  it('should handle another inbetween parent directory', () => {
    expect(removeDotSegments('mid/content=5/../6')).toEqual('/mid/6');
  });

  it('should handle an inbetween current directory', () => {
    expect(removeDotSegments('/abc/./def/')).toEqual('/abc/def/');
  });

  it('should handle multiple parent directories', () => {
    expect(removeDotSegments('/abc/def/ghi/../..')).toEqual('/abc/');
  });

  it('should handle multiple current directories', () => {
    expect(removeDotSegments('/abc/././.')).toEqual('/abc/');
  });

  it('should handle mixed current and parent directories', () => {
    expect(removeDotSegments('/abc/def/./ghi/../..')).toEqual('/abc/');
  });

  it('should handle another mixed current and parent directories', () => {
    expect(removeDotSegments('/a/b/c/./../../g')).toEqual('/a/g');
  });

  it('should not modify fragments', () => {
    expect(removeDotSegments('/abc#abcdef')).toEqual('/abc#abcdef');
  });

  it('should not modify paths in fragments', () => {
    expect(removeDotSegments('/abc#a/bc/def')).toEqual('/abc#a/bc/def');
  });

  it('should not modify current paths in fragments', () => {
    expect(removeDotSegments('/abc#a/./bc/def')).toEqual('/abc#a/./bc/def');
  });

  it('should not modify parent paths in fragments', () => {
    expect(removeDotSegments('/abc#a/../bc/def')).toEqual('/abc#a/../bc/def');
  });

  it('should not modify queries', () => {
    expect(removeDotSegments('/abc?abcdef')).toEqual('/abc?abcdef');
  });

  it('should not modify paths in queries', () => {
    expect(removeDotSegments('/abc?a/bc/def')).toEqual('/abc?a/bc/def');
  });

  it('should not modify current paths in queries', () => {
    expect(removeDotSegments('/abc?a/./bc/def')).toEqual('/abc?a/./bc/def');
  });

  it('should not modify parent paths in queries', () => {
    expect(removeDotSegments('/abc?a/../bc/def')).toEqual('/abc?a/../bc/def');
  });

  it('should handle mixed current and parent directories with a fragment', () => {
    expect(removeDotSegments('/abc/def/./ghi/../..#abc')).toEqual('/abc#abc');
  });

  it('should handle a fragment without another path', () => {
    expect(removeDotSegments('#abc')).toEqual('/#abc');
  });

  it('should not remove zero-length segments', () => {
    expect(removeDotSegments('/abc//def/')).toEqual('/abc//def/');
  });

  it('should be able to parent into zero-length segments', () => {
    expect(removeDotSegments('/abc//def//../')).toEqual('/abc//def/');
  });

  it('should be able to current over zero-length segments', () => {
    expect(removeDotSegments('/abc//def//./')).toEqual('/abc//def//');
  });

  it('should resolve a query against non-/', () => {
    expect(removeDotSegments('/def/ghi?a=b')).toEqual('/def/ghi?a=b');
  });

  it('should resolve a query against /', () => {
    expect(removeDotSegments('/def/?a=b')).toEqual('/def/?a=b');
  });

  it('should resolve a .. and query', () => {
    expect(removeDotSegments('/def/..?a=b')).toEqual('/?a=b');
  });

  it('should just append a .g after a slash', () => {
    expect(removeDotSegments('/a/bb/ccc/.g')).toEqual('/a/bb/ccc/.g');
  });

  it('should just append a g. after a slash', () => {
    expect(removeDotSegments('/a/bb/ccc/g.')).toEqual('/a/bb/ccc/g.');
  });

  it('should just append a ..g after a slash', () => {
    expect(removeDotSegments('/a/bb/ccc/..g')).toEqual('/a/bb/ccc/..g');
  });

  it('should just append a g.. after a slash', () => {
    expect(removeDotSegments('/a/bb/ccc/g..')).toEqual('/a/bb/ccc/g..');
  });

  it('should end with a slash if there is a trailing /.', () => {
    expect(removeDotSegments('/a/bb/ccc/./g/.')).toEqual('/a/bb/ccc/g/');
  });
});
