import { http, HttpResponse } from 'msw';

const requestHeaders = new Map<string, Headers>();

const handlers = [
  // Attachments Cloud
  http.post('/ms/api/availity/internal/core/vault/upload/v1/resumable/:bucket/', async ({ request, requestId }) => {
    // Save file size for patch request
    requestHeaders.set(requestId, request.headers);

    return new HttpResponse(null, {
      status: 201,
      headers: {
        'cache-control': 'no-store',
        'transfer-encoding': 'chunked',
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        location: requestId,
      },
    });
  }),

  http.patch<{ location: string; bucket: string }>(
    '/ms/api/availity/internal/core/vault/upload/v1/resumable/:bucket/:location',
    async ({ request, params }) => {
      if (params.bucket === 'err') {
        return new HttpResponse(null, {
          status: 400,
          headers: {
            'cache-control': 'no-store',
            'tus-resumable': '1.0.0',
            'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          },
        });
      }
      // Parse passed in offset
      let reqOffset = Number(request.headers.get('upload-offset'));
      reqOffset = Number.isNaN(reqOffset) ? 0 : reqOffset;

      // Get file size from previous request
      let fileSize = Number(requestHeaders.get(params.location)?.get('upload-length'));
      fileSize = Number.isNaN(fileSize) ? 0 : fileSize;

      // If it's the first page then return half the file size
      const offset = reqOffset === 0 ? Math.floor(fileSize / 2) : fileSize;

      return new HttpResponse(null, {
        status: 204,
        headers: {
          'cache-control': 'no-store',
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'upload-offset': `${offset === 0 ? offset + 1 : offset},`,
        },
      });
    }
  ),

  http.head<{ bucket: string; location: string }>(
    '/ms/api/availity/internal/core/vault/upload/v1/resumable/:bucket/:location',
    async ({ params }) => {
      const headers = requestHeaders.get(params.location);

      const fileSize = headers?.get('upload-length') || '0';
      const metadata = headers?.get('upload-metadata') || '';

      const results: Record<string, string> = {
        abc: 'accepted',
        enc: 'encrypted',
        mno: 'pending',
        xyz: 'rejected',
      };

      return new HttpResponse(null, {
        status: 200,
        headers: {
          'av-scan-bytes': fileSize,
          'av-scan-result': results[params.bucket] || results.foo,
          'cache-control': 'no-store',
          references: `["approved/${params.bucket}/${params.location}"]`,
          's3-references': `["s3://path-to-vault/approved/${params.bucket}/${params.location}"]`,
          'transfer-encoding': 'chunked',
          'tus-resumable': '1.0.0',
          'upload-length': fileSize,
          'upload-metadata': metadata,
          'upload-offset': fileSize,
          'upload-result': results[params.bucket] || results.foo,
        },
      });
    }
  ),
];

export default handlers;
