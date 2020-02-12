---
title: Logs
summary: Endpoint to log data by level and key/value pairs.
---

## POST /api/v1/log-messages

### Body

-   send the entries that you wish to log in key/value pairs
-   levels include: INFO, DEBUG, WARN, ERROR

### Example Request

```bash
$ curl -i -X POST -H "Content-Type: application/json" -d '{"level": "INFO", "entries": {"user": "userName", "key": "value"}}' 'https://apps.availity.com/api/v1/log-messages'
```

### Response Code

    A 201 created status code indicates a successful log. No response value is returned.
