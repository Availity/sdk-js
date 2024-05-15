---
title: Telemetry
---

Endpoint to send telemetry data by level and key/value pairs.

## POST /ms/api/availity/internal/pui/key-delivery/v1/telemetry

### Body

- `customerId` (_required_) The Availity Customer ID
- `contact` (_required_) The associated email address for the telemetry message
- `owner` (_required_) The owner of the data. Used for determining cost
- `source_system` (_required_) The ID of the application the telemetry message is coming from
- `version` (_required_) The version of the Telemetry API the telemetry message should be validated against
- `payerId` The selected payer in the workflow if there is one
- `sessionId` An alphanumeric ID used to link events from the same session together
- `telemetryBody.level` (_required_) The log level for the telemetry message. Typically one of: ["info", "debug", "warn", "error"]
- `telemetryBody.entries` The key value pairs that should be stored for the telemetry message. entries can be for "known keys" or "unknown keys". Known keys are defined below:
- `telemetryBody.entries.action` (_required_) The action taken by the user to trigger the telemetry message to be sent. Typically one of ["click", "hover", "blur", "focus"]
- `telemetryBody.entries.label` (_required_) The text of the element the user interacts with that triggers the telemetry message.
- `telemetryBody.entries.event` (_required_) The event that occurs when the `action` is taken by the user to trigger the telementry message to be sent. Examples include ["submit", "reset", "redirect", "api"]
- `telemetryBody.entries.category` (_required_) The section of the UI the telemetry message was submitted on

### Example Request

```bash
curl -i -X POST -H "Content-Type: application/json" -d '{
    "customerId": "1194",
    "contact": "myteamdistributionlist@availity.com",
    "owner": "YourTeam",
    "source_system": "eligibility_and_benefits",
    "version": "1",
    "payerId": "A123",
    "sessionId": "123-456-789",
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
