"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[659],{9231:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>o});var i=t(4848),a=t(8453);const s={title:"Analytics"},l=void 0,c={id:"resources/analytics",title:"Analytics",description:"Version",source:"@site/docs/resources/analytics.md",sourceDirName:"resources",slug:"/resources/analytics",permalink:"/sdk-js/resources/analytics",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/resources/analytics.md",tags:[],version:"current",frontMatter:{title:"Analytics"},sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/sdk-js/"},next:{title:"Environment Vars",permalink:"/sdk-js/resources/env-var"}},r={},o=[{value:"Installation",id:"installation",level:2},{value:"NPM",id:"npm",level:3},{value:"Yarn",id:"yarn",level:3},{value:"AvAnalytics() constructor syntax",id:"avanalytics-constructor-syntax",level:2},{value:"<code>plugins</code>: AvAnalyticsPlugin | AvAnalyticsPlugin[]",id:"plugins-avanalyticsplugin--avanalyticsplugin",level:3},{value:"<code>promise</code>: PromiseConstructor",id:"promise-promiseconstructor",level:3},{value:"<code>pageTracking</code>: boolean",id:"pagetracking-boolean",level:3},{value:"<code>autoTrack</code>: boolean",id:"autotrack-boolean",level:3},{value:"<code>options</code>",id:"options",level:3},{value:"<code>options.attributePrefix: string</code>",id:"optionsattributeprefix-string",level:4},{value:"<code>options.recursive: boolean</code>",id:"optionsrecursive-boolean",level:4},{value:"Methods",id:"methods",level:2},{value:"<code>init()</code>",id:"init",level:3},{value:"<code>setPageTracking(isPageTracking: boolean)</code>",id:"setpagetrackingispagetracking-boolean",level:3},{value:"<code>trackEvent(properties: object)</code>",id:"trackeventproperties-object",level:3},{value:"<code>trackPageView(arg?: string | { url?: string })</code>",id:"trackpageviewarg-string---url-string-",level:3},{value:"Plugins",id:"plugins",level:2},{value:"Official AvSplunkAnalytics Plugin",id:"official-avsplunkanalytics-plugin",level:3},{value:"Note about Insights:",id:"note-about-insights",level:4},{value:"Auto Tracking with Data Analytics Attributes",id:"auto-tracking-with-data-analytics-attributes",level:2},{value:"Limitations",id:"limitations",level:3},{value:"Custom Attributes",id:"custom-attributes",level:3},{value:"Required Attribute: <code>data-analytics-action</code>",id:"required-attribute-data-analytics-action",level:3},{value:"Logging for Splunk",id:"logging-for-splunk",level:3},{value:"Logging for Insights",id:"logging-for-insights",level:3},{value:"Logging User Ids",id:"logging-user-ids",level:3},{value:"Logging Telemetry",id:"logging-telemetry",level:3},{value:"Tutorial",id:"tutorial",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/analytics-core",children:(0,i.jsx)(n.img,{src:"https://img.shields.io/npm/v/@availity/analytics-core.svg?style=for-the-badge",alt:"Version"})})}),"\n",(0,i.jsxs)(n.p,{children:["This package provides the base AvAnalytics class as a part of Availity's toolset for tracking user interactions and page load events in your application. It also provides the AvSplunkAnalytics plugin for logging to Splunk and Insights. For a helpful overview of how to setup these tools, read our ",(0,i.jsx)(n.a,{href:"https://availity.github.io/availity-workflow/recipes/logging/",children:"Setting Up Logging"})," guide."]}),"\n",(0,i.jsxs)(n.p,{children:["For logging analytics in a React application, our ",(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/analytics",children:"@availity/analytics"})," package exports the ",(0,i.jsx)(n.code,{children:"Analytics"})," context provider that implements an instance of this AvAnalytics class under the hood. It also exports the ",(0,i.jsx)(n.code,{children:"useAnalytics"})," hook for accessing that instance. See the ",(0,i.jsx)(n.a,{href:"https://availity.github.io/availity-react/components/analytics/analytics/",children:"Analytics component docs"})," for details and example code for React apps."]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.h3,{id:"npm",children:"NPM"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install @availity/analytics-core\n"})}),"\n",(0,i.jsx)(n.h3,{id:"yarn",children:"Yarn"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn add @availity/analytics-core\n"})}),"\n",(0,i.jsx)(n.h2,{id:"avanalytics-constructor-syntax",children:"AvAnalytics() constructor syntax"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const analytics = new AvAnalytics(plugins);\n// or\nconst analytics = new AvAnalytics(plugins, promise);\n// or\nconst analytics = new AvAnalytics(plugins, promise, pageTracking);\n// or\nconst analytics = new AvAnalytics(\n  plugins,\n  promise,\n  pageTracking,\n  autoTrack,\n  options\n);\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"plugins-avanalyticsplugin--avanalyticsplugin",children:[(0,i.jsx)(n.code,{children:"plugins"}),": AvAnalyticsPlugin | AvAnalyticsPlugin[]"]}),"\n",(0,i.jsxs)(n.p,{children:["A plugin or array of plugins used to log the events tracked by the AvAnalytics instance. See the ",(0,i.jsx)(n.a,{href:"#plugins",children:"plugins section"})," below."]}),"\n",(0,i.jsxs)(n.h3,{id:"promise-promiseconstructor",children:[(0,i.jsx)(n.code,{children:"promise"}),": PromiseConstructor"]}),"\n",(0,i.jsxs)(n.p,{children:["This now defaults to JavaScript's native ",(0,i.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",children:"Promise"})," and is no longer required. It is maintained for backwards compatibility with browsers that do not support the native Promise object. Pass ",(0,i.jsx)(n.code,{children:"undefined"})," here if necessary."]}),"\n",(0,i.jsxs)(n.h3,{id:"pagetracking-boolean",children:[(0,i.jsx)(n.code,{children:"pageTracking"}),": boolean"]}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"true"}),", automatic page tracking will be enabled when your AvAnalytics instance is initialized. This means that any subsequent user action that changes the URL in the address bar will automatically call ",(0,i.jsx)(n.a,{href:"#trackpageviewarg-string---url-string-",children:(0,i.jsx)(n.code,{children:"analytics.trackPageView()"})}),', which tracks a "page" event along with the new URL. This means you won\'t need to manually setup your own logic to call ',(0,i.jsx)(n.a,{href:"#trackpageviewarg-string---url-string-",children:(0,i.jsx)(n.code,{children:"analytics.trackPageView()"})})," each time the user navigates to a new page."]}),"\n",(0,i.jsxs)(n.p,{children:["Note: You may still want to manually call ",(0,i.jsx)(n.code,{children:"analytics.trackPageView()"})," one time after initialization. This is because the initial page load will occur before your AvAnalytics instance has been initialized."]}),"\n",(0,i.jsxs)(n.h3,{id:"autotrack-boolean",children:[(0,i.jsx)(n.code,{children:"autoTrack"}),": boolean"]}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"true"}),", automatic tracking of events on DOM elements that have special ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"data analytics attributes"})," will be enabled when your AvAnalytics instance is initialized. This means you won't need to setup your own event handlers for DOM element interactions and manually call ",(0,i.jsx)(n.a,{href:"#trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})})," in those handlers. See the ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"auto tracking"})," section below for details on this technique and its requirements and limitations."]}),"\n",(0,i.jsx)(n.h3,{id:"options",children:(0,i.jsx)(n.code,{children:"options"})}),"\n",(0,i.jsx)(n.h4,{id:"optionsattributeprefix-string",children:(0,i.jsx)(n.code,{children:"options.attributePrefix: string"})}),"\n",(0,i.jsxs)(n.p,{children:["Overrides the default data attribute prefix for the special ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"data analytics attributes used for auto tracking"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Example of default ",(0,i.jsx)(n.code,{children:"attributePrefix"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'// in your JS file\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);\nconst analytics = new AvAnalytics([splunkPlugin]);\nanalytics.init();\nanalytics.trackPageView();\n\n// in your HTML\n<button\n  type="button"\n  data-analytics-my-special-value="abc123"\n  data-analytics-action="click"\n>\n  Button\n</button>;\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Example of a customized ",(0,i.jsx)(n.code,{children:"attributePrefix"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'// in your JS file\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true)\nconst analytics = new AvAnalytics([splunkPlugin], undefined, undefined, undefined, {\n  attributePrefix: \'data-foo-bar\',\n})\nanalytics.init()\nanalytics.trackPageView()\n\n// in your HTML\n<button\n  type="button"\n  data-foo-bar-my-special-value="abc123"\n  data-foo-bar-action="click"\n>\n  Button\n</button>;\n'})}),"\n",(0,i.jsx)(n.h4,{id:"optionsrecursive-boolean",children:(0,i.jsx)(n.code,{children:"options.recursive: boolean"})}),"\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"true"}),", and you are using ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"auto tracking"}),", data analytics attributes from all parent elements will be added to the tracking event, starting from the element that was clicked and going all the way up to the document body."]}),"\n",(0,i.jsxs)(n.p,{children:["For example, the code below will log all three attributes (",(0,i.jsx)(n.code,{children:"appName"}),", ",(0,i.jsx)(n.code,{children:"action"})," and ",(0,i.jsx)(n.code,{children:"eventName"}),") when the anchor tag is clicked. If the container is clicked nothing will happen."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<div class="container" data-analytics-app-name="app">\n  <a\n    href="/somewhere-nice"\n    data-analytics-action="click"\n    data-analytics-event-name="linking"\n  >\n    Click me!\n  </a>\n</div>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The resulting log will include the following data. Notice that ",(0,i.jsx)(n.code,{children:"entries.appName"})," is from a parent element, not the element that was clicked."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"level: info\nentries.appName: app\nentries.eventName: linking\nentries.action: click\nentries.event: click\n"})}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"init",children:(0,i.jsx)(n.code,{children:"init()"})}),"\n",(0,i.jsx)(n.p,{children:"Initialize plugins and other features based on arguments passed to the constructor."}),"\n",(0,i.jsx)(n.h3,{id:"setpagetrackingispagetracking-boolean",children:(0,i.jsx)(n.code,{children:"setPageTracking(isPageTracking: boolean)"})}),"\n",(0,i.jsx)(n.p,{children:"Turn page tracking on or off."}),"\n",(0,i.jsx)(n.h3,{id:"trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"trackEvent(properties: object)"})}),"\n",(0,i.jsxs)(n.p,{children:["Manually track an event. Given an object of string keys with primitive values, all properties will be logged. In contrast to using ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"data attributes for auto tracking"}),", manual tracking does not require an ",(0,i.jsx)(n.code,{children:"action"})," property (although you may choose to include one), and can be fired by any event listeners you choose to add to any element, not just 'click', 'focus' and 'blur' as is the case when using data attributes."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { avLogMessagesApiV2 } from '@availity/api-axios';\nimport { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';\n\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);\nconst analytics = new AvAnalytics([splunkPlugin]);\nanalytics.init();\n\nconst handleSubmit = () => {\n  analytics.trackEvent({ level: 'info', foo: 'bar' });\n};\n\n// add to an event listener for a 'submit' event you want to track\n"})}),"\n",(0,i.jsx)(n.h3,{id:"trackpageviewarg-string---url-string-",children:(0,i.jsx)(n.code,{children:"trackPageView(arg?: string | { url?: string })"})}),"\n",(0,i.jsxs)(n.p,{children:["Manually track a page view. Optionally pass the URL of the current page as a string or an object with a ",(0,i.jsx)(n.code,{children:"url"})," property containing the URL of the current page."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { avLogMessagesApiV2 } from '@availity/api-axios';\nimport { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';\n\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);\nconst analytics = new AvAnalytics([splunkPlugin]);\nanalytics.init();\n\nanalytics.trackPageView(); // defaults to window.location.href\n// or\nanalytics.trackPageView(window.location.href);\n// or\nanalytics.trackPageView({ url: window.location.href });\n"})}),"\n",(0,i.jsx)(n.h2,{id:"plugins",children:"Plugins"}),"\n",(0,i.jsx)(n.p,{children:"Without plugins, the AvAnalytics class would not do anything useful. When AvAnalytics captures an event, it calls methods on each plugin, and it is the plugins that actually do the useful work of responding to those events. Any object with some or all of the following methods can be considered a plugin:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"isEnabled"})," - Determines if this plugin is enabled. Disabled plugins will not respond to events. This can be a method that returns a boolean or it can be a static boolean property."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"init"})," - If defined, will be called when ",(0,i.jsx)(n.code,{children:"AvAnalytics"})," is initialized."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"trackEvent"})," - If defined, this plugin method will be called every time ",(0,i.jsx)(n.a,{href:"#trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})})," is called. It will be forwarded the same event data passed to that original call."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"trackPageView"})," - If defined, this plugin method will be called every time ",(0,i.jsx)(n.a,{href:"#trackpageviewarg-string---url-string-",children:(0,i.jsx)(n.code,{children:"analytics.trackPageView()"})})," is called. It will be forwarded the same new page URL passed to that original call."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["A default class with functions defined and enabled logic is provided by ",(0,i.jsx)(n.code,{children:"AvAnalyticsPlugin"})," from ",(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/analytics-core",children:"@availity/analytics-core"}),". Extend this class to define your own custom plugins"]}),"\n",(0,i.jsx)(n.h3,{id:"official-avsplunkanalytics-plugin",children:"Official AvSplunkAnalytics Plugin"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"AvSplunkAnalytics"})," is a plugin used for logging to Splunk and Insights. It requires an instance of ",(0,i.jsx)(n.code,{children:"avLogMessagesApiV2"})," from ",(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/api-axios",children:"@availity/api-axios"}),". ",(0,i.jsx)(n.strong,{children:"WARNING"}),": In almost all cases, the older ",(0,i.jsx)(n.code,{children:"avLogMessagesApi"})," should not be used since it does not work with Insights."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { AvAnalytics, AvSplunkAnalytics } from '@availity/analytics-core';\nimport { avLogMessagesApiV2 } from '@availity/api-axios';\n\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);\nconst analytics = new AvAnalytics([splunkPlugin]);\nanalytics.init();\n"})}),"\n",(0,i.jsx)(n.h4,{id:"note-about-insights",children:"Note about Insights:"}),"\n",(0,i.jsxs)(n.p,{children:["In order to use Insights reporting, each log must include the Payer Space ID. If you are using manual tracking with the ",(0,i.jsx)(n.a,{href:"#trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})})," method, be sure to include a ",(0,i.jsx)(n.code,{children:"spaceId"})," property."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"analytics.trackEvents({\n  spaceId: 'ABC123ABC123ABC123ABC123ABC123AB',\n  myOtherCustomValue: 'abc123',\n});\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If you are using ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"auto tracking with data analytics attributes"}),", you can include the Payer Space ID in your logs by adding a ",(0,i.jsx)(n.code,{children:"data-analytics-space-id"})," attribute with the ID of the Payer Space as it's value."]}),"\n",(0,i.jsx)(n.p,{children:"Plain HTML example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<button\n  data-analytics-action="click"\n  data-analytics-space-id="ABC123ABC123ABC123ABC123ABC123AB"\n>\n  My Button\n</button>\n'})}),"\n",(0,i.jsx)(n.p,{children:"When using React, you can get the Payer Space ID from within a Payer Spaces app like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import React, { useMemo } from 'react';\nimport Analytics from '@availity/analytics';\nimport { Button } from 'reactstrap';\nimport { avLogMessagesApiV2 } from '@availity/api-axios';\nimport { AvSplunkAnalytics } from '@availity/analytics-core';\nimport { useLocation } from 'react-router-dom';\n\nconst splunkPlugin = new AvSplunkAnalytics(avLogMessagesApiV2, true);\n\nconst App = () => {\n  const { search } = useLocation();\n  const queryParams = useMemo(() => new URLSearchParams(search), [search]);\n  const spaceId = queryParams.get('spaceId');\n\n  return (\n    <Analytics plugins={[splunkPlugin]}>\n      <div data-analytics-space-id={spaceId}>\n        <Button type=\"button\" data-analytics-action=\"click\">\n          MyButton\n        </Button>\n      </div>\n    </Analytics>\n  );\n};\n\nexport default App;\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Putting the ",(0,i.jsx)(n.code,{children:"spaceId"})," on an element near the root of your app means it will be included with all ",(0,i.jsx)(n.a,{href:"#auto-tracking-with-data-analytics-attributes",children:"auto-tracked"})," user events as long as ",(0,i.jsx)(n.code,{children:"recursive"})," has not been set to ",(0,i.jsx)(n.code,{children:"false"}),". ",(0,i.jsx)(n.code,{children:"recursive"})," is ",(0,i.jsx)(n.code,{children:"true"})," by default."]}),"\n",(0,i.jsx)(n.h2,{id:"auto-tracking-with-data-analytics-attributes",children:"Auto Tracking with Data Analytics Attributes"}),"\n",(0,i.jsxs)(n.p,{children:["AvAnalyics provides two ways to track user interactions. You can manually call ",(0,i.jsx)(n.a,{href:"#trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})}),", passing it the data you want to include in your logs, or you can use auto tracking. Auto tracking is enabled by default when your instance of AvAnalytics is initialized. You can disable auto tracking by passing ",(0,i.jsx)(n.code,{children:"false"})," as the fourth argument to the AvAnalytics constructor."]}),"\n",(0,i.jsxs)(n.p,{children:["When auto tracking is enabled, AvAnalytics will automatically track events based on the presence of special ",(0,i.jsx)(n.code,{children:"data-analytics-..."})," attributes on DOM elements throughout your app. The prefix for these attributes can be customized using the ",(0,i.jsxs)(n.a,{href:"#optionsattributeprefix-string",children:[(0,i.jsx)(n.code,{children:"options"})," parameter"]})," of the AvAnalytics constructor. Data from these attributes will be added to the auto tracked event. The keys for this data will be the camel cased names of the attributes after the prefix is removed."]}),"\n",(0,i.jsx)(n.p,{children:"For example, auto tracking for this element..."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<button data-analytics-action="click" data-analytics-my-special-value="123">\n  Click me!\n</button>\n'})}),"\n",(0,i.jsx)(n.p,{children:"...will include this data:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"level: info\nentries.mySpecialValue: 123\nentries.action: click\nentries.event: click\n"})}),"\n",(0,i.jsx)(n.h3,{id:"limitations",children:"Limitations"}),"\n",(0,i.jsx)(n.p,{children:"The type of events that can be tracked using these attributes is limited as follows:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"focus"})," and ",(0,i.jsx)(n.code,{children:"blur"})," events can be tracked on ",(0,i.jsx)(n.code,{children:"<select>"}),", ",(0,i.jsx)(n.code,{children:"<textarea>"})," and ",(0,i.jsx)(n.code,{children:"<input>"})," elements. You cannot track ",(0,i.jsx)(n.code,{children:"click"})," events on these elements using auto tracking."]}),"\n",(0,i.jsxs)(n.li,{children:["All other element types can ",(0,i.jsx)(n.em,{children:"only"})," track ",(0,i.jsx)(n.code,{children:"click"})," events using auto tracking."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["If these limitations prevent you from logging the events you are interested in, you will need to use manual tracking by calling ",(0,i.jsx)(n.a,{href:"#trackeventproperties-object",children:(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})})," directly. Be aware that calling ",(0,i.jsx)(n.code,{children:"analytics.trackEvent()"})," from within an event handler attached to a DOM element will not add data from any data analytics attributes on that element."]}),"\n",(0,i.jsx)(n.h3,{id:"custom-attributes",children:"Custom Attributes"}),"\n",(0,i.jsx)(n.p,{children:"You can add as many custom attributes as you like:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<button\n  data-analytics-action="click"\n  data-analytics-my-favorite-pizza-toppings="green olive and pineapple"\n  data-analytics-space-id="ABC123ABC123ABC123ABC123ABC123AB"\n  data-analytics-application-id="XYZ789"\n>\n  Click me!\n</button>\n'})}),"\n",(0,i.jsx)(n.p,{children:"Data from all of these attributes will be included in the auto tracked event as long as the required attribute below is also included on the same element."}),"\n",(0,i.jsxs)(n.h3,{id:"required-attribute-data-analytics-action",children:["Required Attribute: ",(0,i.jsx)(n.code,{children:"data-analytics-action"})]}),"\n",(0,i.jsxs)(n.p,{children:["The only required attribute is ",(0,i.jsx)(n.code,{children:"data-analytics-action"}),". It defines the type of interaction that will trigger auto tracking and it's value can only be ",(0,i.jsx)(n.code,{children:"click"}),", ",(0,i.jsx)(n.code,{children:"focus"})," or ",(0,i.jsx)(n.code,{children:"blur"}),". If this attribute is missing, no user interactions on that element will be auto tracked."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"IMPORTANT:"})," No ",(0,i.jsx)(n.code,{children:"click"})," events can be auto tracked on ",(0,i.jsx)(n.code,{children:"<select>"}),", ",(0,i.jsx)(n.code,{children:"<textarea>"})," or ",(0,i.jsx)(n.code,{children:"<input>"})," elements, and no ",(0,i.jsx)(n.code,{children:"blur"})," or ",(0,i.jsx)(n.code,{children:"focus"})," events can be auto tracked on elements other than ",(0,i.jsx)(n.code,{children:"<select>"}),", ",(0,i.jsx)(n.code,{children:"<textarea>"})," and ",(0,i.jsx)(n.code,{children:"<input>"}),". See ",(0,i.jsx)(n.a,{href:"#limitations",children:"limitations"})," above."]}),"\n",(0,i.jsx)(n.h3,{id:"logging-for-splunk",children:"Logging for Splunk"}),"\n",(0,i.jsx)(n.p,{children:"All attributes, including any custom attributes you've created, will be logged in Splunk."}),"\n",(0,i.jsx)(n.h3,{id:"logging-for-insights",children:"Logging for Insights"}),"\n",(0,i.jsx)(n.p,{children:"Only the following attributes will be available in Insights."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-space-id"}),": This is ",(0,i.jsx)(n.strong,{children:"required"})," for Payer Spaces to have their data appear in Insights. For Payer Spaces app, the Payer Space ID is available from ",(0,i.jsx)(n.code,{children:"window.location"}),". See ",(0,i.jsx)(n.a,{href:"#note-about-insights",children:"this note about insights"})," for example code for retrieving and including your Payer Space ID."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-application-id"}),": Application ID. Can be set at the root of your project."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-action"}),': The action that triggered the log (example: "click")']}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-label"}),': Identifies the element the user interacted with (example: "search")']}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-category"}),': Category of the page (example: "spaces application").']}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data-analytics-value"}),": String value to be logged."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["If manually tracking with ",(0,i.jsx)(n.code,{children:"analytics.trackEvent()"}),", use the camelCased variation of these attributes as your object keys:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"spaceId"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"applicationId"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"action"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"label"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"category"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"value"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"logging-user-ids",children:"Logging User Ids"}),"\n",(0,i.jsx)(n.p,{children:"User IDs are automatically added to logging, so they do not need to be explicitly added."}),"\n",(0,i.jsx)(n.h3,{id:"logging-telemetry",children:"Logging Telemetry"}),"\n",(0,i.jsx)(n.p,{children:"The AvTelemetryAnalytics constructor syntax is as follows."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"// in your JS file\nconst telemetryPlugin = new AvTelemetryAnalytics(\n  avTelemetryApi,\n  true,\n  source_system,\n  contact,\n  sessionId\n);\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"source_system"})," and ",(0,i.jsx)(n.code,{children:"contact"})," are required. ",(0,i.jsx)(n.code,{children:"sessionId"})," will be generated if none is provided."]}),"\n",(0,i.jsx)(n.p,{children:"In order to match the telemetry api structure, attributes should be structured as follows."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["customerId - ",(0,i.jsx)(n.code,{children:"data-analytics-customer-id"})]}),"\n",(0,i.jsx)(n.li,{children:"contact - This is passed in the plugin constructor."}),"\n",(0,i.jsx)(n.li,{children:"source_system - This is passed in the plugin constructor."}),"\n",(0,i.jsx)(n.li,{children:"version - Do not pass. This is handled by the plugin."}),"\n",(0,i.jsxs)(n.li,{children:["payerId - ",(0,i.jsx)(n.code,{children:"data-analytics-payer-id"})]}),"\n",(0,i.jsx)(n.li,{children:"sessionId - The is passed in the plugin constructor."}),"\n",(0,i.jsxs)(n.li,{children:["telemetryBody.level - Only necessary if the level is not ",(0,i.jsx)(n.code,{children:"info"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["telemetryBody.entries.action - ",(0,i.jsx)(n.code,{children:"data-analytics-action"})]}),"\n",(0,i.jsxs)(n.li,{children:["telemetryBody.entries.label - ",(0,i.jsx)(n.code,{children:"data-analytics-label"})]}),"\n",(0,i.jsxs)(n.li,{children:["telemetryBody.entries.event - ",(0,i.jsx)(n.code,{children:"data-analytics-event"})]}),"\n",(0,i.jsxs)(n.li,{children:["telemetryBody.entries.category - ",(0,i.jsx)(n.code,{children:"data-analytics-category"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["You can find the definitions of these fields ",(0,i.jsx)(n.a,{href:"/sdk-js/api/definitions/telemetry#body",children:"here"}),". All other ",(0,i.jsx)(n.code,{children:"data-analytics-*"})," values will be passed in ",(0,i.jsx)(n.code,{children:"telemetryBody.entries"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["If manually tracking with ",(0,i.jsx)(n.code,{children:"analytics.trackEvent()"}),", use the camelCased variation of these attributes as your object keys:"]}),"\n",(0,i.jsx)(n.h2,{id:"tutorial",children:"Tutorial"}),"\n",(0,i.jsxs)(n.p,{children:["See ",(0,i.jsx)(n.a,{href:"https://availity.github.io/availity-workflow/recipes/logging",children:"Setting up logging"})]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>c});var i=t(6540);const a={},s=i.createContext(a);function l(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);