import { http, HttpResponse } from 'msw';

// --- Mock Data ---

export const mockUser = {
  id: '1234',
  userId: 'testuser',
  akaname: 'Test User',
  email: 'test.user@availity.com',
  firstName: 'Test',
  lastName: 'User',
  createDate: '2020-01-01T00:00:00.000Z',
  currentRegion: 'FL',
  jobTitle: 'Developer',
  userHasSecurityException: false,
  userValidated: true,
};

export const mockOrganization = {
  id: 'org-1',
  customerId: 'cust-1',
  name: 'Test Organization',
  status: 'Active',
  statusCode: 'A',
  types: [{ code: 'provider', value: 'Provider' }],
  regions: [{ code: 'FL', value: 'Florida' }],
  npis: [{ number: '1234567890' }],
  links: {
    self: { href: '/api/sdk/platform/v1/organizations/org-1' },
  },
};

export const mockRegion = {
  id: 'FL',
  value: 'Florida',
  currentlySelected: true,
};

export const mockProvider = {
  id: 'prov-1',
  businessName: 'Test Provider Group',
  npi: '1234567890',
  customerIds: ['cust-1'],
};

export const mockPermission = {
  id: 'perm-1',
  description: 'Test Permission',
  organizations: [{ id: 'org-1', name: 'Test Organization', resources: [{ id: 'res-1' }] }],
};

export const mockSettings = {
  settings: [{ applicationId: 'test-app', favorites: [] }],
};

export const mockCode = {
  id: 'code-1',
  value: 'Test Code',
};

export const mockDisclaimer = {
  id: 'disclaimer-1',
  text: 'This is a test disclaimer.',
};

export const mockNotification = {
  id: 'notif-1',
  topicId: 'topic-1',
  message: 'Test notification',
};

export const mockSpace = {
  id: 'space-1',
  name: 'Test Space',
  description: 'A test space',
};

// --- Handlers ---

const userHandlers = [
  http.get('*/cloud/web/appl/user-management/legacy/sdk/platform/v1/users/me', () =>
    HttpResponse.json(mockUser)
  ),
  http.get('*/cloud/web/appl/user-management/legacy/sdk/platform/v1/users/:id', ({ params }) =>
    HttpResponse.json({ ...mockUser, id: params.id })
  ),
];

const regionsHandlers = [
  http.get('*/api/sdk/platform/v1/regions', ({ request }) => {
    const url = new URL(request.url);
    const currentlySelected = url.searchParams.get('currentlySelected');

    const regions = currentlySelected === 'true' ? [mockRegion] : [mockRegion];

    return HttpResponse.json({
      totalCount: regions.length,
      count: regions.length,
      offset: 0,
      limit: 50,
      regions,
      links: { self: { href: '/api/sdk/platform/v1/regions' } },
    });
  }),
  http.put('*/api/sdk/platform/v1/regions/:region', ({ params }) =>
    HttpResponse.json({
      id: params.region,
      value: params.region,
      currentlySelected: true,
      links: { self: { href: `/api/sdk/platform/v1/regions/${params.region}` } },
    })
  ),
];

const organizationsHandlers = [
  http.get('*/api/sdk/platform/v1/organizations', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      organizations: [mockOrganization],
      links: { self: { href: '/api/sdk/platform/v1/organizations' } },
    })
  ),
  http.post('*/api/sdk/platform/v1/organizations', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      organizations: [mockOrganization],
      links: { self: { href: '/api/sdk/platform/v1/organizations' } },
    })
  ),
];

const settingsHandlers = [
  http.get('*/api/utils/v1/settings', () =>
    HttpResponse.json(mockSettings)
  ),
  http.put('*/api/utils/v1/settings', () =>
    HttpResponse.json(mockSettings)
  ),
];

const providersHandlers = [
  http.get('*/api/internal/v1/providers', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      providers: [mockProvider],
      links: { self: { href: '/api/internal/v1/providers' } },
    })
  ),
];

const permissionsHandlers = [
  http.get('*/api/sdk/platform/v1/permissions', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      permissions: [mockPermission],
      links: { self: { href: '/api/sdk/platform/v1/permissions' } },
    })
  ),
];

const userPermissionsHandlers = [
  http.get('*/cloud/web/appl/feature-management/legacy/v1/user-permissions', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      axiUserPermissions: [mockPermission],
      links: { self: { href: '/cloud/web/appl/feature-management/legacy/v1/user-permissions' } },
    })
  ),
  http.post('*/cloud/web/appl/feature-management/legacy/v1/user-permissions', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      axiUserPermissions: [mockPermission],
      links: { self: { href: '/cloud/web/appl/feature-management/legacy/v1/user-permissions' } },
    })
  ),
];

const codesHandlers = [
  http.get('*/api/v1/codes', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      codes: [mockCode],
      links: { self: { href: '/api/v1/codes' } },
    })
  ),
  http.get('*/api/v1/codes/:id', ({ params }) =>
    HttpResponse.json({ ...mockCode, id: params.id })
  ),
];

const disclaimersHandlers = [
  http.get('*/api/sdk/platform/v1/disclaimers', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      disclaimers: [mockDisclaimer],
      links: { self: { href: '/api/sdk/platform/v1/disclaimers' } },
    })
  ),
];

const notificationsHandlers = [
  http.get('*/api/v1/notifications', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      notifications: [mockNotification],
      links: { self: { href: '/api/v1/notifications' } },
    })
  ),
  http.delete('*/api/v1/notifications', () =>
    HttpResponse.json({})
  ),
];

const spacesHandlers = [
  http.get('*/api/sdk/platform/v1/spaces', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      spaces: [mockSpace],
      links: { self: { href: '/api/sdk/platform/v1/spaces' } },
    })
  ),
  http.get('*/api/sdk/platform/v1/spaces/:id', ({ params }) =>
    HttpResponse.json({ ...mockSpace, id: params.id })
  ),
];

const navigationHandlers = [
  http.get('*/api/sdk/platform/v1/navigation/spaces', () =>
    HttpResponse.json({
      totalCount: 1,
      count: 1,
      offset: 0,
      limit: 50,
      spaces: [mockSpace],
      links: { self: { href: '/api/sdk/platform/v1/navigation/spaces' } },
    })
  ),
];

const pdfHandlers = [
  http.post('*/api/utils/v1/pdfs', () =>
    HttpResponse.json({
      links: { pdf: { href: '/api/utils/v1/pdfs/download/test.pdf' } },
    })
  ),
];

const handlers = [
  ...userHandlers,
  ...regionsHandlers,
  ...organizationsHandlers,
  ...settingsHandlers,
  ...providersHandlers,
  ...permissionsHandlers,
  ...userPermissionsHandlers,
  ...codesHandlers,
  ...disclaimersHandlers,
  ...notificationsHandlers,
  ...spacesHandlers,
  ...navigationHandlers,
  ...pdfHandlers,
];

export {
  userHandlers,
  regionsHandlers,
  organizationsHandlers,
  settingsHandlers,
  providersHandlers,
  permissionsHandlers,
  userPermissionsHandlers,
  codesHandlers,
  disclaimersHandlers,
  notificationsHandlers,
  spacesHandlers,
  navigationHandlers,
  pdfHandlers,
};

export default handlers;
