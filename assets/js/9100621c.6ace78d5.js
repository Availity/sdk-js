"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[693],{5127:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=n(4848),s=n(8453);const o={title:"Notifications"},r=void 0,a={id:"api/definitions/notifications",title:"Notifications",description:"Notifications are sent to users to inform or notify them of actions that should be performed.",source:"@site/docs/api/definitions/notifications.md",sourceDirName:"api/definitions",slug:"/api/definitions/notifications",permalink:"/sdk-js/api/definitions/notifications",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/api/definitions/notifications.md",tags:[],version:"current",frontMatter:{title:"Notifications"},sidebar:"someSidebar",previous:{title:"Navigation Spaces",permalink:"/sdk-js/api/definitions/navigation"},next:{title:"Organizations",permalink:"/sdk-js/api/definitions/organizations"}},l={},c=[{value:"GET /api/v1/notifications",id:"get-apiv1notifications",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Example Request",id:"example-request",level:3},{value:"Example Response",id:"example-response",level:3}];function d(e){const i={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:"Notifications are sent to users to inform or notify them of actions that should be performed."}),"\n",(0,t.jsx)(i.h2,{id:"get-apiv1notifications",children:"GET /api/v1/notifications"}),"\n",(0,t.jsx)(i.p,{children:"Find notifications for the current user. The request parameters act as filters on the list."}),"\n",(0,t.jsx)(i.h3,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"to.userSource"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Filter by user source system (available to support users only)"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"to.userId"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Filter by user ids (available to support users only)"]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"nature"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Filter by the specified nature(s). Accepts multiple ",(0,t.jsx)(i.code,{children:"nature"})," parameters."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"type"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Filter by specified type of notification."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"topic"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Filter by specified topic of notification."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeRead"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Include read notifications. Defaults to false."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeUnread"})," _(optional) \u2014 Include unread notifications. Defaults to true."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeViewed"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Include viewed notifications. Defaults to true."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeUnviewed"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Include unviewed notifications. Defaults to true."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeInactive"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Include inactive notifications. Defaults to false."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"includeSources"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Include notification sources. Defaults to false."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"sortBy"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Field to sort by. The default is 'lastDeliveryDate'."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.strong,{children:"sortDirection"})," ",(0,t.jsx)(i.em,{children:"(optional)"})," \u2014 Sort direction. The default is 'desc'."]}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"example-request",children:"Example Request"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"GET https://apps.availity.com/api/notifications?type=PDM&includeRead=true\n"})}),"\n",(0,t.jsx)(i.h3,{id:"example-response",children:"Example Response"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-json",children:'{\n  "totalCount": 1,\n  "count": 1,\n  "offset": 0,\n  "limit": 50,\n  "links": {\n    "self": {\n      "href": "https://apps.availity.com/api/v1/notifications?type=PDM&includeRead=true"\n    }\n  },\n  "notifications": [\n    {\n      "id": "83582901741516995037509300045112",\n      "createdDate": "2018-01-26T19:31:03.000+0000",\n      "updatedDate": "2018-03-02T16:20:08.000+0000",\n      "nature": "Action Item",\n      "type": "PDM",\n      "subject": "Provider Data Management",\n      "title": "Acme provider directory - We have not received your verified Q1 information.  Please submit&#x21;",\n      "subtitle": "Quarterly submissions build trust with patients that your information is correct and reliable.",\n      "message": "Acme provider directory - We have not received your verified Q1 information.  Please submit&#x21;",\n      "link": "&#x2f;public&#x2f;apps&#x2f;provider-self-service-maintenance&#x2f;&#x23;&#x2f;cms",\n      "linkTarget": "_blank",\n      "activeDate": "2018-03-01T19:30:31.000+0000",\n      "expirationDate": "2018-03-30T04:00:00.000+0000",\n      "lastDeliveryDate": "2018-03-01T19:30:32.000+0000",\n      "topic": "PDM",\n      "read": false,\n      "viewed": true,\n      "interruptIndicator": false\n    }\n  ]\n}\n'})})]})}function u(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>a});var t=n(6540);const s={},o=t.createContext(s);function r(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:i},e.children)}}}]);