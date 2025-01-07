/* eslint-disable max-classes-per-file */
import { HttpStack, HttpRequest, HttpResponse } from 'tus-js-client';

class Response implements HttpResponse {
  private _response: globalThis.Response;

  private _body: string = '';

  constructor(response: globalThis.Response) {
    this._response = response;
  }

  getStatus() {
    return this._response.status;
  }

  getHeader(header: string) {
    return this._response.headers.get(header) || undefined;
  }

  getBody() {
    return this._body;
  }

  async parseBody() {
    this._body = await this._response.text();
  }

  getUnderlyingObject() {
    return this._response;
  }
}

class Request implements HttpRequest {
  private _method: string;

  private _url: string;

  private _headers: Record<string, string>;

  private _abortController: AbortController;

  private _progressHandler?: (loaded: number) => void;

  constructor(method: string, url: string) {
    this._method = method;
    this._url = url;
    this._headers = {};
    this._abortController = new AbortController();
  }

  getMethod() {
    return this._method;
  }

  getURL() {
    return this._url;
  }

  setHeader(header: string, value: string) {
    this._headers[header] = value;
  }

  getHeader(header: string) {
    return this._headers[header];
  }

  setProgressHandler(progressHandler: (loaded: number) => void) {
    this._progressHandler = progressHandler;
  }

  async send(body: RequestInit['body'] = null) {
    try {
      const response = await fetch(this._url, {
        method: this._method,
        headers: this._headers,
        body,
        signal: this._abortController.signal,
        credentials: 'include',
        // Add duplex: 'half' if you need to stream request body
      });

      // Handle progress if a progress handler was set
      if (this._progressHandler) {
        const reader = response.clone().body?.getReader();

        if (reader) {
          let loaded = 0;
          let done;
          let value;

          while (!done) {
            ({ value, done } = await reader.read());
            if (done) {
              break;
            }
            // @ts-expect-error value is a byte array
            loaded += value?.length || 0;
            this._progressHandler(loaded);
          }
        }
      }

      const _response = new Response(response.clone());
      _response.parseBody();

      return _response;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // Handle abort case
        throw new Error('Request aborted');
      }

      throw error;
    }
  }

  abort() {
    this._abortController.abort();
    return Promise.resolve();
  }

  getUnderlyingObject() {
    return this._abortController;
  }
}

export default class FetchHttpStack implements HttpStack {
  createRequest(method: string, url: string) {
    return new Request(method, url);
  }

  getName() {
    return 'FetchHttpStack';
  }
}
