# Availity API's

## Table of Contents

* [Intro](#Intro)
* [AvUser](#AvUser)
* [AvRegions](#AvRegions)
* [AvPermissions](#AvPermissions)
* [AvUserPermissions](#AvUserPermissions)
* [AvNavigation](#AvNavigation)
* [AvSpaces](#AvSpaces)
* [AvOrganizations](#AvOrganizations)
* [AvProviders](#AvProviders)
* [AvLogMessage](#AvLogMessage)

## Intro
To see the details for configuring the resources see [AvApi](../README.md).

### AvUser

Get information about current logged-in user.

#### Methods

##### `me()` 
Helper function that returns information about logged-in user.

### AvRegions
Gets the logged-in user's current selected region as well as the regions the user is associated with.

#### Methods

##### `getRegions(config)`
Get regions for logged-in user.

##### `getCurrentRegion()`
Returns just the current region for the logged-in user.

### AvPermissions
Get permissions belonging to the logged-in user.

### AvUserPermissions
Get permissions as well as resources of the logged-in user.

### AvSpaces
Get metadata for the various content types for the Spaces platform. 

### AvOrganizations
Service that allows you to get logged=in user's active organizations.

#### Methods

#### `queryOrganizations(user, config)`
Returns organizations belonging to the `user`.

##### `getOrganizations(config)`
Returns organizations belonging to the logged-in user.

### AvProviders
Get providers associated to the logged-in user's organization.

### AvLogMessage
Create a log message.

#### Methods

All methods take a entries object, remove it's level, and using the level of the function, call create with `{level, entries}`;
* debug
* info
* warn
* error
