"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[591],{2289:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>n,metadata:()=>l,toc:()=>c});const l=JSON.parse('{"id":"resources/resolve-url","title":"Resolving Urls","description":"Resolve URLs to absolute URI/IRI.","source":"@site/docs/resources/resolve-url.md","sourceDirName":"resources","slug":"/resources/resolve-url","permalink":"/sdk-js/resources/resolve-url","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/resources/resolve-url.md","tags":[],"version":"current","frontMatter":{"title":"Resolving Urls"},"sidebar":"someSidebar","previous":{"title":"relay-id","permalink":"/sdk-js/resources/relay-id"},"next":{"title":"Yup Extensions","permalink":"/sdk-js/resources/yup"}}');var a=s(4848),t=s(8453);const n={title:"Resolving Urls"},i=void 0,o={},c=[{value:"Installation",id:"installation",level:2},{value:"NPM",id:"npm",level:3},{value:"Yarn",id:"yarn",level:3},{value:"<code>resolveUrl(params: { relative:string; base?: string })</code>",id:"resolveurlparams--relativestring-base-string-",level:2},{value:"Params",id:"params",level:3},{value:"Usage",id:"usage",level:2},{value:"URLs",id:"urls",level:3},{value:"Hashes",id:"hashes",level:3},{value:"Invalid base URI",id:"invalid-base-uri",level:3},{value:"Protocol Relative",id:"protocol-relative",level:3},{value:"Root-Relative",id:"root-relative",level:3},{value:"Relative Directory Traversal",id:"relative-directory-traversal",level:3},{value:"Notes",id:"notes",level:2}];function d(e){const r={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.p,{children:"Resolve URLs to absolute URI/IRI."}),"\n",(0,a.jsx)(r.p,{children:(0,a.jsx)(r.a,{href:"https://www.npmjs.com/package/@availity/resolve-url",children:(0,a.jsx)(r.img,{src:"https://img.shields.io/npm/v/@availity/resolve-url.svg?style=for-the-badge",alt:"Version"})})}),"\n",(0,a.jsxs)(r.p,{children:["This library resolves relative IRIs to absolute IRIs given a base IRI, conforming to ",(0,a.jsx)(r.a,{href:"https://www.ietf.org/rfc/rfc3986.txt",children:"RFC3986"}),". The code was borrowed from ",(0,a.jsx)(r.a,{href:"https://github.com/rubensworks/relative-to-absolute-iri.js",children:"relative-to-absolute-iri"}),"."]}),"\n",(0,a.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(r.h3,{id:"npm",children:"NPM"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-bash",children:"npm install @availity/resolve-url\n"})}),"\n",(0,a.jsx)(r.h3,{id:"yarn",children:"Yarn"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-bash",children:"yarn add @availity/resolve-url\n"})}),"\n",(0,a.jsx)(r.h2,{id:"resolveurlparams--relativestring-base-string-",children:(0,a.jsx)(r.code,{children:"resolveUrl(params: { relative:string; base?: string })"})}),"\n",(0,a.jsx)(r.h3,{id:"params",children:"Params"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:(0,a.jsx)(r.code,{children:"relative"})}),": Relative url to be converted to full url"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:(0,a.jsx)(r.code,{children:"base"})})," (",(0,a.jsx)(r.em,{children:"optional"}),"): Base url used to convert the relative url. If base URL is not provided it is calculated from ",(0,a.jsx)(r.code,{children:"window.location.href"}),"."]}),"\n"]}),"\n",(0,a.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs https://example.com/a/b\nresolveUrl({ relative: '/a/b', base: 'https://example.com/' });\n"})}),"\n",(0,a.jsx)(r.h3,{id:"urls",children:"URLs"}),"\n",(0,a.jsxs)(r.p,{children:["When ",(0,a.jsx)(r.code,{children:"base"})," option is not provided, this package will calculate the base from ",(0,a.jsx)(r.code,{children:"window.location.href"}),". The example below returns server relative url if hostname was ",(0,a.jsx)(r.code,{children:"https://example.com"})]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs https://example.com/a/b\nresolveUrl({ relative: '/a/b' });\n"})}),"\n",(0,a.jsxs)(r.blockquote,{children:["\n",(0,a.jsxs)(r.p,{children:["The following examples were adapted from ",(0,a.jsx)(r.a,{href:"https://github.com/rubensworks/relative-to-absolute-iri.js",children:"relative-to-absolute-iri"})]}),"\n"]}),"\n",(0,a.jsx)(r.h3,{id:"hashes",children:"Hashes"}),"\n",(0,a.jsx)(r.p,{children:"Fragments/hashes in relative URIs are also taken into account."}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs 'http://base.org/#abc'\nresolveUrl({ relative: '#abc', base: 'http://base.org/' });\n"})}),"\n",(0,a.jsx)(r.h3,{id:"invalid-base-uri",children:"Invalid base URI"}),"\n",(0,a.jsx)(r.p,{children:"Invalid base URIs cause an error to be thrown."}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Error\nresolveUrl({ relative: 'abc', base: 'def' });\n"})}),"\n",(0,a.jsx)(r.h3,{id:"protocol-relative",children:"Protocol Relative"}),"\n",(0,a.jsxs)(r.p,{children:["When a relative IRI starts with a ",(0,a.jsx)(r.code,{children:"//"}),", then the scheme of the base IRI will be used."]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs 'http://abc'\nresolveUrl({ relative: '//abc', base: 'http://base.org/' });\n"})}),"\n",(0,a.jsx)(r.h3,{id:"root-relative",children:"Root-Relative"}),"\n",(0,a.jsxs)(r.p,{children:["Relative URIs that starts with a ",(0,a.jsx)(r.code,{children:"/"})," erase the path of the base IRI."]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs 'http://base.org/abc/def/'\nresolveUrl({ relative: '/abc/def/', base: 'http://base.org/123/456/' });\n"})}),"\n",(0,a.jsx)(r.h3,{id:"relative-directory-traversal",children:"Relative Directory Traversal"}),"\n",(0,a.jsxs)(r.p,{children:["Relative URIs that point to the current directory (",(0,a.jsx)(r.code,{children:"."}),")\nor parent directory (",(0,a.jsx)(r.code,{children:".."}),") are collapsed."]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:"import resolveUrl from '@availity/resolve-url';\n\n// Outputs 'http://aa/xyz'\nresolveUrl({ relative: 'xyz', base: 'http://aa/parent/parent/../../a' });\n\n// Outputs 'http://aa/xyz'\nresolveUrl('xyz', 'http://aa/././a');\n"})}),"\n",(0,a.jsx)(r.h2,{id:"notes",children:"Notes"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.code,{children:"URI"})," - Uniform Resource Identifier allows ASCII characters"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.code,{children:"IRI"})," - Internationalized Resource Identifier allows Unicode typeset"]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>n,x:()=>i});var l=s(6540);const a={},t=l.createContext(a);function n(e){const r=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:n(e.components),l.createElement(t.Provider,{value:r},e.children)}}}]);