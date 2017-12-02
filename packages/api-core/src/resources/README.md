# Predefined Availity API's

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
To see the details for configuring the resources see [AvApi](../README.md)

All are created with the same parameters as `AvApi` unless otherwise specified.

### AvUser

Used to get data about user by id

#### Methods

##### `me()` 
Gets the currently logged in user profile

### AvRegions
Gets the current users current region as well as all available regions.

#### Configuration
`AvRegions` requires an `AvUser` object or similar object.

#### Methods

##### `getRegions(config)`
Get regions for currently logged-in user.

##### `getCurrentRegion()`
Returns just the current region for the currently logged-in user.

### AvPermissions
Get permissions belonging to the current user.

### AvUserPermissions
Get permissions and resources of currently logged-in user.

### AvSpaces
Get data about any of the Space types. 

### AvOrganizations
Service that allows you to get a user's active organizations.

#### Configuration
`AvOrganizations` requires an AvUser object, can use the `AvUser` predefined resource, or any object with a `.me()` promise that returns similar data.

#### Methods

#### `queryOrganizations(user, config)`
Returns organizations belonging to the passed in user.

##### `getOrganizations(config)`
Returns organizations belonging to the currently logged in User

### AvProviders
Get providers associated to the current user's organization.

### AvLogMessage
Create a log message.

#### Methods

All methods take a entries object, remove it's level, and using the level of the function, call create with `{level, entries}`;
* debug
* info
* warn
* error
