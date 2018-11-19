# Availity message

A package wrapping the postMessage function with helper functions and security checks.

## Install

`npm install @availity/message-core`

## how to use

`import avMessage from '@availity/message-core`

## Methods

### subscribe

`const unsubscribe = avMessage.subscribe(event, fn)` when a message event is received and verified, fn will be called with the event data.

it returns a function that can be used to unsubscribe from that event

### unsubscribe

`avMessage.unsubscribe(eventName)` will remove all listeners for this event.

### unsubscribeAll

`avMessage.unsubscribeAll()` will remove all listeners for all events.

### enabled

if a value is passed in, sets messaging's enabled flag true/false based on value.

returns boolean enabled flag value.

### domain

returns a string of the windows current domain.

## send

`avMessage.send(payload, target)` will send the payload to the target if AvMessage is enabled.
target defaults to the parent window. payload will be stringified if not a string.

## Authors

**Kasey Powers**

-   [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License

[MIT](../../LICENSE)
