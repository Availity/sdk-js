# Availity API's

## Table of Contents

* [Intro](#intro)
* [AvUser](#avuser)
* [AvRegions](#avregions)
* [AvPermissions](#avpermissions)
* [AvUserPermissions](#avuserpermissions)
* [AvNavigation](#avnavigation)
* [AvSpaces](#avspaces)
* [AvOrganizations](#avorganizations)
* [AvProviders](#avproviders)
* [AvLogMessage](#avlogmessage)
* [AvProxy](#avproxy)

## Intro
View [AvApi](../README.md) to see the details for configuring API definitions. 

### AvUser

Get information about current logged in user.

#### Methods

##### `me()` 
Helper function that returns information about logged in user.

### AvRegions
Gets the logged in user's current selected region as well as the regions the user is associated with.

#### Methods

##### `getRegions(config)`
Get regions for logged in user.

##### `getCurrentRegion()`
Returns just the current region for the logged in user.

### AvPermissions
Get permissions belonging to the logged in user.

### AvUserPermissions
Get permissions as well as resources of the logged in user.

### AvSpaces
Get metadata for the various content types for the Spaces platform. 

### AvOrganizations
Service that allows you to get logged=in user's active organizations.

#### Methods

#### `queryOrganizations(user, config)`
Returns organizations belonging to the `user`.

##### `getOrganizations(config)`
Returns organizations belonging to the logged in user.

### AvProviders
Get providers associated to the logged in user's organization.

#### Methods

##### `getProviders(customerId, config)`
Helper method that gets the providers for the `customerId`.

### AvLogMessage
Create a log message.

#### Methods

All methods take a key value object. A key named 'level` determines the log level type in the logs.


#####  `debug(keyValue)`
#####  `info(keyValue)`
#####  `warn(keyValue)`
#####  `error(keyValue)`

### AvProxy
Create API definitions for services that are proxied to a tenant's API gateway. 

#### Options

##### `tenant`
The Spaces platform customer name which is used as part of the url for API's proxied to 3rd party API gateway.


