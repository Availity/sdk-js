---
title: PDF
summary: Endpoint converts HTML into a PDF for download.
---

## POST /api/utils/v1/pdfs

### Headers

-   **X-Availity-Customer-ID** _(required)_ - Organization customer id is used by the system to identify the owner of the PDF document.

### Parameters

-   **applicationId** _(required)_ — Application name that created the PDF request. Examples: `credentialing-app`, `awesome-healthcare-app`
-   **html** _(required)_ - Simple HTML that renders into a PDF. Max size `2Mb`.
-   **fileName** _(optional)_ - If `fileName` is not assigned then the default PDF job id is used instead.

### Notes

-   Send an entire HTML document including `<html>` and `<body>` elements
-   You should produce HTML specifically for PDF rendering. Keep your HTML and styles simple and compact. Table layouts usually work out well in PDF format.
-   CSS at the head of your document will be used by the PDF rendering engine
-   Images can included using base64 encoded data URLs in image tags. Ex: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb2Z0d2Fy..." />`
-   Make sure to use HTML entities in your templates. For example, if you want to render an apostrophe `'` then use entity `&apos;` instead. Please see [https://www.w3.org/wiki/Common_HTML_entities_used_for_typography](https://www.w3.org/wiki/Common_HTML_entities_used_for_typography) for references to other HTML entities.

### Response Codes

-   **200** - PDF created and can be downloaded
-   **202** - PDF is processing and is not ready for download

### Example Request

```bash
$ curl -i -H "Content-Type: application/json" -H "X-Availity-Customer-ID: 1194" -X POST -d '{
  "applicationId" : "example",
  "html" : "<html><body>hello world</body></html>"
}' https://apps.availity.com/api/utils/v1/pdfs
```

### Example Response

```bash
HTTP/1.1 202 Accepted
Content-Type: application/json
x-api-id: fec4cd7c-e940-47e5-912e-e78a8d09980b
X-Session-ID: fec4cd7c-e940-47e5-912e-e78a8d09980b
Cache-Control: private,no-store,max-age=0,must-revalidate
Location: https://apps.availity.com/api/utils/v1/pdfs/-6746445849906334272
X-Status-Message: We are processing your request.
Date: Tue, 18 Aug 2015 15:28:22 GMT
Content-Length: 355
Server: Jetty(7.4.5.v20110725)
{
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/utils/v1/pdfs/-6746445849906334272"
    }
  },
  "id" : "-6746445849906334272",
  "createdDate" : "2015-08-18T15:28:22.107+0000",
  "updatedDate" : "2015-08-18T15:28:22.122+0000",
  "expirationDate" : "2015-08-19T15:28:22.107+0000",
  "status" : "In Progress",
  "statusCode" : "0",
  "applicationId" : "example"
}
```

### FAQ

#### How do I create read only checkboxes?

Rending checkboxes is already supported out of the box but you can't prevent the user from selecting/deselecting the checkbox. In order to show read only checkboxes you will have to include inline images in your template.

Read-only checked box using image:

```html
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALlJREFUeNqkk4ENRBEMhr23gBHYwG3gbWIEt4kR3AZGEBMZoaeX9OKE4F6TP6r0S7XB2E07Kt8Uyc38V72JRbApffaw3nsGAF0ZY4blRKUUoJBeINBaSf6c0R2s4AegtYaccxdCybjGGMcAtBrinAOMUzLaFNBCUNba71kNOFfnJeV8wsMnkL/0hF4TMbbURCEEcM7/HyMGERBCgJERhABHA7hKFdOGpZTIvWqAK3psfqbn3d/M3gIMAKucGfYNKY2DAAAAAElFTkSuQmCC"
/>
```

Read-only unchecked box using image:

```html
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFlJREFUeNpiYKAQMCKx44FYgUT9C5A5+4H4P4nYngnZBHt7e4b///8TxPv374frYaI0DEYNGDUABFiQORcuXGBwcHAgqOnDhw9YM1M/EBuQ6IACSn3AABBgAD1AMzq0zMgbAAAAAElFTkSuQmCC"
/>
```

Example Handlebar templates than conditionally renders check/uncheck state when `showChecked` is `true`:

```html
<table cellspacing="0">
    <tr>
        <td class="cell-100">
            {{#if showChecked}}
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALlJREFUeNqkk4ENRBEMhr23gBHYwG3gbWIEt4kR3AZGEBMZoaeX9OKE4F6TP6r0S7XB2E07Kt8Uyc38V72JRbApffaw3nsGAF0ZY4blRKUUoJBeINBaSf6c0R2s4AegtYaccxdCybjGGMcAtBrinAOMUzLaFNBCUNba71kNOFfnJeV8wsMnkL/0hF4TMbbURCEEcM7/HyMGERBCgJERhABHA7hKFdOGpZTIvWqAK3psfqbn3d/M3gIMAKucGfYNKY2DAAAAAElFTkSuQmCC"
            />
            {{else}}
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFlJREFUeNpiYKAQMCKx44FYgUT9C5A5+4H4P4nYngnZBHt7e4b///8TxPv374frYaI0DEYNGDUABFiQORcuXGBwcHAgqOnDhw9YM1M/EBuQ6IACSn3AABBgAD1AMzq0zMgbAAAAAElFTkSuQmCC"
            />
            {{/if}}
        </td>
    </tr>
</table>
```

You can use any image for checked/unchecked state as long as it can fit inside data uri attribute.
