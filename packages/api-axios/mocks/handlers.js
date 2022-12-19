// src/mocks/handlers.js
import { rest } from 'msw';

const handlers = [
  // Handles a POST /login request
  rest.put('/api/sdk/platform/v1/regions/:region', (req, res, ctx) => {
    const { region } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        links: {
          self: {
            href: `https://localhost:3000/api/sdk/platform/v1/regions/${region}`,
          },
        },
        id: region,
        value: region,
        currentlySelected: true,
      })
    );
  }),

  // Handles a GET /user request
  rest.get('/user', null),
];

export default handlers;
