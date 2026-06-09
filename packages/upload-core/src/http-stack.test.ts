import FetchHttpStack from './http-stack';

describe('FetchHttpStack', () => {
  let stack: FetchHttpStack;

  beforeEach(() => {
    stack = new FetchHttpStack();
  });

  test('getName returns FetchHttpStack', () => {
    expect(stack.getName()).toBe('FetchHttpStack');
  });

  test('createRequest returns a request with correct method and url', () => {
    const req = stack.createRequest('POST', 'https://example.com/upload');
    expect(req.getMethod()).toBe('POST');
    expect(req.getURL()).toBe('https://example.com/upload');
  });

  describe('Request', () => {
    test('setHeader and getHeader work correctly', () => {
      const req = stack.createRequest('PATCH', '/upload');
      req.setHeader('Content-Type', 'application/octet-stream');
      expect(req.getHeader('Content-Type')).toBe('application/octet-stream');
    });

    test('getHeader returns undefined for unset headers', () => {
      const req = stack.createRequest('GET', '/upload');
      expect(req.getHeader('X-Missing')).toBeUndefined();
    });

    test('send calls fetch with correct options', async () => {
      const mockResponse = new Response('ok', { status: 200, headers: { 'x-custom': 'value' } });
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const req = stack.createRequest('PATCH', 'https://example.com/upload');
      req.setHeader('Upload-Offset', '0');

      const res = await req.send(new Blob(['data']));

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://example.com/upload',
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Upload-Offset': '0' },
          credentials: 'include',
        })
      );
      expect(res.getStatus()).toBe(200);

      fetchSpy.mockRestore();
    });

    test('response getHeader returns header value', async () => {
      const mockResponse = new Response(null, { status: 204, headers: { 'Upload-Offset': '100' } });
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const req = stack.createRequest('HEAD', '/upload');
      const res = await req.send();

      expect(res.getHeader('Upload-Offset')).toBe('100');
      expect(res.getHeader('X-Nonexistent')).toBeUndefined();

      vi.restoreAllMocks();
    });

    test('abort causes send to throw', async () => {
      vi.spyOn(globalThis, 'fetch').mockImplementation(
        (_url, opts) =>
          new Promise((_resolve, reject) => {
            (opts as RequestInit).signal?.addEventListener('abort', () => {
              reject(new DOMException('The operation was aborted.', 'AbortError'));
            });
          })
      );

      const req = stack.createRequest('PATCH', '/upload');
      const sendPromise = req.send(new Blob(['data']));
      await req.abort();

      await expect(sendPromise).rejects.toThrow('Request aborted');

      vi.restoreAllMocks();
    });

    test('send rethrows non-abort errors', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network failure'));

      const req = stack.createRequest('POST', '/upload');
      await expect(req.send()).rejects.toThrow('Network failure');

      vi.restoreAllMocks();
    });

    test('getUnderlyingObject returns AbortController', () => {
      const req = stack.createRequest('POST', '/upload');
      expect(req.getUnderlyingObject()).toBeInstanceOf(AbortController);
    });

    test('progress handler is called with loaded bytes', async () => {
      const chunks = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5])];
      let readIndex = 0;

      const mockBody = {
        getReader: () => ({
          read: () => {
            if (readIndex < chunks.length) {
              const chunk = chunks[readIndex];
              readIndex += 1;
              return Promise.resolve({ value: chunk, done: false });
            }
            return Promise.resolve({ value: undefined, done: true });
          },
        }),
      };

      const mockResponse = new Response('hello');
      Object.defineProperty(mockResponse, 'body', { value: mockBody });
      // clone() needs to return the same mock body
      vi.spyOn(mockResponse, 'clone').mockReturnValue(mockResponse);
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      const progressHandler = vi.fn();
      const req = stack.createRequest('PATCH', '/upload');
      req.setProgressHandler(progressHandler);

      await req.send(new Blob(['12345']));

      expect(progressHandler).toHaveBeenCalledWith(3); // first chunk
      expect(progressHandler).toHaveBeenCalledWith(5); // cumulative

      vi.restoreAllMocks();
    });
  });
});
