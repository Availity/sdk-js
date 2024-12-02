// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const handlers = [
  // http.post('/ms/api/availity/internal/core/vault/upload/v1/resumable/*', ({ params }) => {
  http.post('/ms/api/availity/*', ({ params }) => {
    console.log('here');
    const { region } = params;

    return HttpResponse.json(
      {
        links: {
          self: {
            href: `https://localhost:3000/api/sdk/platform/v1/regions/${region}`,
          },
        },
        id: region,
        value: region,
        currentlySelected: true,
      },
      { status: 200 }
    );
  }),

  // Handles a GET /user request
  http.get('/user', null),
];

export default handlers;
