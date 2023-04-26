---
title: Telemetry
---

Endpoint to send telemetry data by level and key/value pairs.

## POST /ms/api/availity/internal/pui/key-delivery/v1/telemetry

### Body

- `customerId` The Availity Customer Id
- `contact` The associated email address for the telemetry message
- `source_system` The id of the application the telemetry message is coming from
- `version` The version of the Telemetry API the telemetry message should be validated against
- `telemetryBody.level` The log level for the telemetry message. Typically one of: ["info", "debug", "warn", "error"]
- `telemetryBody.entries` The key value pairs that should be stored for the telemetry message. entries can be for "known keys" or "unknown keys". Known keys are defined below:
- `telemetryBody.entries.action` The action taken by the user to trigger the telemetry message to be sent. Typically one of ["click", "hover", "blur", "focus"]
- `telemetryBody.entries.label` The text of the element the user interacts with that triggers the telemetry message.
- `telemetryBody.entries.event` The event that occurs when the `action` is taken by the user to trigger the telementry message to be sent. Examples include ["submit", "reset", "redirect", "api"]
- `telemetryBody.entries.category` The section of the UI the telemetry message was submitted on

### Example Request

```bash
curl -i -X POST -H "Content-Type: application/json" -d '{
    "customerId": "1194",
    "contact": "myteamdistributionlist@availity.com",
    "source_system": "eligibility_and_benefits",
    "version": "1",
    "telemetryBody": {
        "level": "info",
        "entries": {
            "event": "submit",
            "action": "click",
            "label": "Submit",
            "category": "form",
            "elementId": "abc123",
            "userId": "aka123"
        }
    }
}}' 'https://apps.availity.com/ms/api/availity/internal/pui/key-delivery/v1/telemetry'
```

### Response Code

A 201 created status code indicates a successful log. No response value is returned.
