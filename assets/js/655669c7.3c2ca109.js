"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[264],{4691:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=i(4848),t=i(8453);const r={title:"Permissions"},o=void 0,l={id:"api/definitions/permissions",title:"Permissions",description:"A permission represents a relationship between an organization and a user, possibly in the context of one or more payers.",source:"@site/docs/api/definitions/permissions.md",sourceDirName:"api/definitions",slug:"/api/definitions/permissions",permalink:"/sdk-js/api/definitions/permissions",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/api/definitions/permissions.md",tags:[],version:"current",frontMatter:{title:"Permissions"},sidebar:"someSidebar",previous:{title:"PDF",permalink:"/sdk-js/api/definitions/pdfs"},next:{title:"Providers",permalink:"/sdk-js/api/definitions/providers"}},a={},p=[{value:"GET /api/sdk/platform/v1/permissions",id:"get-apisdkplatformv1permissions",level:2},{value:"Example Request",id:"example-request",level:3},{value:"Example Response",id:"example-response",level:3},{value:"GET /api/sdk/platform/v1/permissions/",id:"get-apisdkplatformv1permissions-1",level:2},{value:"Example Request",id:"example-request-1",level:3},{value:"Example Response",id:"example-response-1",level:3}];function d(e){const s={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"A permission represents a relationship between an organization and a user, possibly in the context of one or more payers."}),"\n",(0,n.jsx)(s.h2,{id:"get-apisdkplatformv1permissions",children:"GET /api/sdk/platform/v1/permissions"}),"\n",(0,n.jsx)(s.p,{children:"Find a user's permissions with a set of parameters. The request parameters act as filters on the collection."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"id"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," \u2014 Allows the client to retrieve multiple permissions by their ids. Accepts multiple ",(0,n.jsx)(s.code,{children:"id"})," parameters. Other parameters will be ignored if the ",(0,n.jsx)(s.code,{children:"id"})," parameter is used."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"roleId"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," \u2014 Allows the client to retrieve multiple permissions associated with the specified role. Accepts multiple ",(0,n.jsx)(s.code,{children:"roleId"})," parameters."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"userId"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Allows the client to retrieve permissions for the specified user. Accepts a single userId parameter."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"organizationId"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Allows the client to retrieve permissions or the specified organizationId. Accepts a single userId parameter. Ignored unless ",(0,n.jsx)(s.code,{children:"userId"})," is sent."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"includeResources"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Allows the client to retrieve the resources assigned to the permission. Defaults to ",(0,n.jsx)(s.code,{children:"false"}),"."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"sortBy"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Allows the client to sort the collection. Supports ",(0,n.jsx)(s.code,{children:"id"})," and ",(0,n.jsx)(s.code,{children:"description"}),". Defaults to description. Accepts a single ",(0,n.jsx)(s.code,{children:"sortBy"}),"parameter."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"sortDirection"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Allows the client to specify a sort direction. Clients can sort by ",(0,n.jsx)(s.code,{children:"asc"})," or ",(0,n.jsx)(s.code,{children:"desc"}),". Defaults to asc."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"offset"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Paging offset. Defaults to ",(0,n.jsx)(s.code,{children:"0"}),"."]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"limit"})," ",(0,n.jsx)(s.em,{children:"(optional)"})," - Paging limit. Defaults to ",(0,n.jsx)(s.code,{children:"50"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"example-request",children:"Example Request"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"GET https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka987654321\n"})}),"\n",(0,n.jsx)(s.h3,{id:"example-response",children:"Example Response"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-json",children:'{\n  "totalCount": 264,\n  "count": 50,\n  "offset": 0,\n  "limit": 50,\n  "links": {\n    "next": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789&offset=50&limit=50"\n    },\n    "last": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789&offset=250&limit=50"\n    },\n    "self": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789"\n    }\n  },\n  "permissions": [\n    {\n      "links": {\n        "organizations": {\n          "href": "https://apps.availity.com/api/sdk/platform/v1/organizations?permissionId=7052&userId=aka12345789"\n        },\n        "self": {\n          "href": "https://apps.availity.com/api/sdk/platform/v1/permissions/7153"\n        }\n      },\n      "id": "7153",\n      "description": "Administrative Reports"\n    }\n  ]\n}\n'})}),"\n",(0,n.jsxs)(s.h2,{id:"get-apisdkplatformv1permissions-1",children:["GET /api/sdk/platform/v1/permissions/",":id"]}),"\n",(0,n.jsx)(s.p,{children:"Retrieves a permission by its id."}),"\n",(0,n.jsx)(s.h3,{id:"example-request-1",children:"Example Request"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"GET https:/apps.availity.com/api/sdk/platform/v1/permissions/7153\n"})}),"\n",(0,n.jsx)(s.h3,{id:"example-response-1",children:"Example Response"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-json",children:'{\n  "links": {\n    "self": {\n      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions/7153"\n    }\n  },\n  "id": "7153",\n  "description": "Administrative Reports"\n}\n'})})]})}function c(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>o,x:()=>l});var n=i(6540);const t={},r=n.createContext(t);function o(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);