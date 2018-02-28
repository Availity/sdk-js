const API_OPTIONS = {
  API: {
    // default base segment for Availity API endpoints
    path: '/api',

    // full url to api resource
    url: null,

    // name of resource
    name: null,

    // defaults version for api
    version: '/v1',

    // cache all request by default
    cache: true,

    // flag used to enable behaviors around the Availity Rest API
    api: true,

    polling: true, //  1s,  2s,  5s,  10s

    pollingIntervals: [1e3, 2e3, 5e3, 1e4], // in ms

    // default headers
    headers: {
      // Turn off content encoding for angular apis
      'X-Response-Encoding-Context': 'NONE',
    },

    sessionBust: true,
  },
  MS: {
    // default base segment for Availity API endpoints
    path: '/ms/api/availity/internal',

    // full url to api resource
    url: null,

    // name of resource
    name: null,

    // defaults version for api
    version: null,

    // cache all request by default
    cache: false,

    // flag used to enable behaviors around the Availity Rest API
    api: true,

    polling: false, //  1s,  2s,  5s,  10s

    pollingIntervals: [1e3, 2e3, 5e3, 1e4], // in ms

    // default headers
    headers: {
      // Turn off content encoding for angular apis
      'X-Response-Encoding-Context': 'NONE',
    },

    sessionBust: false,
  },
};

export default API_OPTIONS;
