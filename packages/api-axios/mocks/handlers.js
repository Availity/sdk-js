import { http, HttpResponse } from 'msw';

const handlers = [
  // Handles a POST /login request
  http.put('/api/sdk/platform/v1/regions/:region', ({ params }) => {
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
