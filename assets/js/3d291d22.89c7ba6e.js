"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[225],{6113:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>t,metadata:()=>d,toc:()=>a});var r=i(4848),s=i(8453);const t={title:"Providers"},o=void 0,d={id:"api/definitions/providers",title:"Providers",description:"A provider represents a person or non person entity that provides healthcare service.",source:"@site/docs/api/definitions/providers.md",sourceDirName:"api/definitions",slug:"/api/definitions/providers",permalink:"/sdk-js/api/definitions/providers",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/api/definitions/providers.md",tags:[],version:"current",frontMatter:{title:"Providers"},sidebar:"someSidebar",previous:{title:"Permissions",permalink:"/sdk-js/api/definitions/permissions"},next:{title:"Regions",permalink:"/sdk-js/api/definitions/regions"}},l={},a=[{value:"GET /api/internal/v1/providers",id:"get-apiinternalv1providers",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Example Request",id:"example-request",level:3},{value:"Example Response",id:"example-response",level:3}];function c(e){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"A provider represents a person or non person entity that provides healthcare service."}),"\n",(0,r.jsx)(n.h2,{id:"get-apiinternalv1providers",children:"GET /api/internal/v1/providers"}),"\n",(0,r.jsx)(n.p,{children:"Find provider information by organization."}),"\n",(0,r.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"customerId"})," ",(0,r.jsx)(n.em,{children:"(required)"})," \u2014 List of organization ids to check for providers."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"providerId"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," \u2014 The Provider Id to filter by. It is the last set digits of the id."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"role"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," \u2014 List of provider roles to filter by. Examples: ",(0,r.jsx)(n.code,{children:"ATNG"}),", ",(0,r.jsx)(n.code,{children:"BILL"}),", ",(0,r.jsx)(n.code,{children:"PAY"}),", etc."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"q"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," - A list of search terms to filter by."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"sortBy"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," - Allows the client to specify a field to sort results by. Example: ",(0,r.jsx)(n.code,{children:"name"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"sortDirection"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," - Allows the client to specify a sort direction. Clients can sort by ",(0,r.jsx)(n.code,{children:"asc"})," or ",(0,r.jsx)(n.code,{children:"desc"}),". Defaults to ",(0,r.jsx)(n.code,{children:"asc"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"offset"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," - Paging offset. Defaults to ",(0,r.jsx)(n.code,{children:"0"}),". This is the zero-based index of the first item to return."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"limit"})," ",(0,r.jsx)(n.em,{children:"(optional)"})," - Paging limit. Defaults to ",(0,r.jsx)(n.code,{children:"50"}),". The maximum is ",(0,r.jsx)(n.code,{children:"50"}),". This is the maximum number of items to return."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"example-request",children:"Example Request"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"GET https://apps.availity.com/api/internal/v1/providers?customerId=123456\n"})}),"\n",(0,r.jsx)(n.h3,{id:"example-response",children:"Example Response"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "totalCount": 2,\n  "count": 2,\n  "offset": 0,\n  "limit": 50,\n  "links": {\n    "self": {\n      "href": "https://apps.availity.com/api/internal/v1/providers?customerId=123456"\n    }\n  },\n  "providers": [\n    {\n      "id": "274929-269194-123456",\n      "businessName": "GENERIC PHARMACY",\n      "uiDisplayName": "GENERIC PHARMACY",\n      "atypical": false,\n      "npi": "1003921024",\n      "customerIds": ["123456"],\n      "roles": [\n        {\n          "code": "ATNG",\n          "value": "Attending"\n        },\n        {\n          "code": "BILL",\n          "value": "Billing"\n        },\n        {\n          "code": "OPRG",\n          "value": "Operating Physician"\n        },\n        {\n          "code": "PAY",\n          "value": "Pay to Provider"\n        },\n        {\n          "code": "RFAC",\n          "value": "Referred to Facility"\n        },\n        {\n          "code": "RFRD",\n          "value": "Referred to Provider"\n        },\n        {\n          "code": "RFRG",\n          "value": "Referring Provider"\n        },\n        {\n          "code": "RNDG",\n          "value": "Rendering Provider"\n        },\n        {\n          "code": "RQST",\n          "value": "Requesting Provider"\n        },\n        {\n          "code": "SFAC",\n          "value": "Service Facility"\n        }\n      ],\n      "primaryPhone": {\n        "internationalCellularCode": "&#x2b;1",\n        "areaCode": "334",\n        "phoneNumber": "671-3784"\n      },\n      "primaryFax": {\n        "internationalCellularCode": "&#x2b;1",\n        "areaCode": "334",\n        "phoneNumber": "671-0181"\n      },\n      "primaryAddress": {\n        "line1": "2115 E MAIN ST",\n        "line2": "STE 3",\n        "city": "DOTHAN",\n        "state": "ALABAMA",\n        "stateCode": "AL",\n        "zip": {\n          "code": "36301",\n          "addon": "3044"\n        }\n      }\n    },\n    {\n      "id": "274329-269194-123456",\n      "lastName": "LINCOLN",\n      "firstName": "ABE",\n      "middleName": "E",\n      "uiDisplayName": "LINCOLN, ABE E",\n      "atypical": false,\n      "npi": "1902208000",\n      "customerIds": ["123456"],\n      "roles": [\n        {\n          "code": "ATNG",\n          "value": "Attending"\n        },\n        {\n          "code": "BILL",\n          "value": "Billing"\n        },\n        {\n          "code": "OPRG",\n          "value": "Operating Physician"\n        },\n        {\n          "code": "PAY",\n          "value": "Pay to Provider"\n        },\n        {\n          "code": "RFAC",\n          "value": "Referred to Facility"\n        }\n      ],\n      "primarySpecialty": {\n        "code": "207X00000X",\n        "value": "Orthopaedic Surgery"\n      },\n      "primaryAddress": {\n        "line1": "12901 BRUCE B DOWNS BLVD",\n        "line2": "UNIVERSITY OF SOUTH FLORIDA",\n        "city": "TAMPA",\n        "state": "FLORIDA",\n        "stateCode": "FL",\n        "zip": {\n          "code": "33612",\n          "addon": "4742"\n        }\n      }\n    }\n  ]\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>d});var r=i(6540);const s={},t=r.createContext(s);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);