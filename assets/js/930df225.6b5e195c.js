"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[984],{6035:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"api/definitions/navigation","title":"Navigation Spaces","description":"A Navigation object returns the navigational hierarchy in the portal and lists the id, name, link, permissions, dates, child or parent ids, and icon information associated.","source":"@site/docs/api/definitions/navigation.md","sourceDirName":"api/definitions","slug":"/api/definitions/navigation","permalink":"/sdk-js/api/definitions/navigation","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/api/definitions/navigation.md","tags":[],"version":"current","frontMatter":{"title":"Navigation Spaces"},"sidebar":"someSidebar","previous":{"title":"Logs","permalink":"/sdk-js/api/definitions/logs"},"next":{"title":"Notifications","permalink":"/sdk-js/api/definitions/notifications"}}');var s=i(4848),a=i(8453);const o={title:"Navigation Spaces"},r=void 0,l={},c=[{value:"GET /api/sdk/platform/v1/navigation/spaces",id:"get-apisdkplatformv1navigationspaces",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Example Request",id:"example-request",level:3},{value:"Example Response",id:"example-response",level:3},{value:"GET /api/sdk/platform/v1/navigation/spaces/",id:"get-apisdkplatformv1navigationspaces-1",level:2},{value:"Example Request",id:"example-request-1",level:3},{value:"Example Response",id:"example-response-1",level:3}];function d(e){const n={blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"A Navigation object returns the navigational hierarchy in the portal and lists the id, name, link, permissions, dates, child or parent ids, and icon information associated."}),"\n",(0,s.jsx)(n.h2,{id:"get-apisdkplatformv1navigationspaces",children:"GET /api/sdk/platform/v1/navigation/spaces"}),"\n",(0,s.jsx)(n.p,{children:"Find navigational objects using the spaces API. The request parameters act as filters on the collection."}),"\n",(0,s.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:["The client must send at least one of the following: ",(0,s.jsx)(n.code,{children:"id"}),", ",(0,s.jsx)(n.code,{children:"customerId"}),", ",(0,s.jsx)(n.code,{children:"userId"})," or ",(0,s.jsx)(n.code,{children:"q"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"id"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," \u2014 Allows the client to retrieve multiple spaces by their ids. Accepts multiple ",(0,s.jsx)(n.code,{children:"id"})," parameters."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"authorized"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," \u2014 Allows the client to filter by whether the current user is authorized for the spaces."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"region"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to filter by regions. Accepts multiple ",(0,s.jsx)(n.code,{children:"region"})," parameters."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"output"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to retrieve result data by level. Allowed values: ",(0,s.jsx)(n.code,{children:"sparse"})," or ",(0,s.jsx)(n.code,{children:"full"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"includeInactive"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to retrieve inactive spaces."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"ignoreOverrides"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to ignore any environment-specific overrides."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"childless"})," _(optional) - Whether to retrieve spaces without children to the results."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"depth"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to specify the depth of the tree to return (0 = no limits)."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"filterOnRegion"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Allows the client to filter by region or only use the region for permission checks."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"offset"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Paging offset. Defaults to ",(0,s.jsx)(n.code,{children:"0"}),". This is the zero-based index of the first item to return."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"limit"})," ",(0,s.jsx)(n.em,{children:"(optional)"})," - Paging limit. Defaults to ",(0,s.jsx)(n.code,{children:"50"}),". The maximum is ",(0,s.jsx)(n.code,{children:"50"}),". This is the maximum number of items to return."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"example-request",children:"Example Request"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"GET https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2\n"})}),"\n",(0,s.jsx)(n.h3,{id:"example-response",children:"Example Response"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "totalCount": 54,\n  "count": 2,\n  "offset": 0,\n  "limit": 2,\n  "links": {\n    "next": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2&offset=2"\n    },\n    "last": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2&offset=53"\n    },\n    "self": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2"\n    }\n  },\n  "spaces": [\n    {\n      "id": "acme",\n      "name": "Acme",\n      "description": "Acme",\n      "link": {\n        "text": "Acme",\n        "url": "/availity/ServiceRegistrationServlet?menuTempl=6248",\n        "target": "newBody"\n      },\n      "version": "1.0.0",\n      "type": "navigation",\n      "brand": {\n        "name": "Availity",\n        "id": "21907"\n      },\n      "owners": [\n        {\n          "id": "aka86041677777"\n        }\n      ],\n      "feature": {},\n      "permissions": ["6248"],\n      "icons": {\n        "dashboard": "icon-doc-alt"\n      },\n      "activeDate": "2016-03-31T20:08:00.000-0400",\n      "createDate": "2016-03-22T15:04:27.000-0400",\n      "updateDate": "2017-11-15T11:13:22.000-0500",\n      "parentIds": ["enrollments_center_links"],\n      "hasAccess": false\n    },\n    {\n      "id": "Request Roster",\n      "name": "Request Roster",\n      "description": "Request Roster",\n      "link": {\n        "text": "Request Roster",\n        "url": "/availity/common/linkout_disclaimer.jsp",\n        "target": "_blank"\n      },\n      "version": "1.0.0",\n      "type": "navigation",\n      "brand": {\n        "name": "Availity",\n        "id": "21907"\n      },\n      "owners": [\n        {\n          "id": "aka86041677777"\n        }\n      ],\n      "feature": {},\n      "permissions": ["7065"],\n      "activeDate": "2016-03-14T18:14:00.000-0400",\n      "createDate": "2016-03-22T15:04:27.000-0400",\n      "updateDate": "2017-06-30T15:29:43.000-0400",\n      "parentIds": [],\n      "metadata": {\n        "ghostText": "This link has been moved to Payer Spaces/Resources.",\n        "ghosted": "true"\n      },\n      "hasAccess": true\n    }\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.h2,{id:"get-apisdkplatformv1navigationspaces-1",children:["GET /api/sdk/platform/v1/navigation/spaces/",":id"]}),"\n",(0,s.jsx)(n.p,{children:"Retrieves a navigation space by its id."}),"\n",(0,s.jsx)(n.h3,{id:"example-request-1",children:"Example Request"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"GET https://apps.availity.com/api/sdk/platform/v1/navigation/spaces/eligibility_benefits\n"})}),"\n",(0,s.jsx)(n.h3,{id:"example-response-1",children:"Example Response"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "id": "eligibility_benefits",\n  "name": "Eligibility and Benefits Inquiry",\n  "shortName": "EB",\n  "description": "Eligibility and Benefits Inquiry",\n  "link": {\n    "text": "Eligibility and Benefits Inquiry",\n    "url": "/public/apps/eligibility?cachebust=1454552674322",\n    "target": "newBody"\n  },\n  "version": "1.0.0",\n  "type": "navigation",\n  "keywords": [\n    "benefits",\n    "e&b",\n    "carecalc",\n    "care cost estimator",\n    "inquiry",\n    "patient",\n    "service",\n    "eligibility",\n    "270",\n    "copay",\n    "benefit",\n    "care calc"\n  ],\n  "brand": {\n    "name": "Availity",\n    "id": "21907"\n  },\n  "owners": [\n    {\n      "id": "aka86041677773",\n      "name": "Availity"\n    }\n  ],\n  "permissions": ["7457", "7458", "7181"],\n  "icons": {\n    "navigation": "app-icon-orange"\n  },\n  "activeDate": "2016-03-08T16:27:23.000-0500",\n  "createDate": "2016-03-22T15:04:27.000-0400",\n  "updateDate": "2018-02-09T12:14:55.000-0500",\n  "parentIds": ["top_applications", "patient_registration"]\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>r});var t=i(6540);const s={},a=t.createContext(s);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);