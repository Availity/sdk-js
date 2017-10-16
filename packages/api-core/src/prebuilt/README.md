# Predefined Availity API's

## Table of Contents

* [Intro](#Intro)
* [AvUser](#AvUser)
* [AvRegions](#AvRegions)
* [AvPermissions](#AvPermissions)
* [AvUserPermissions](#AvUserPermissions)
* [AvNavigation & AvSpaces](#AvNavigation-&-AvSpaces)
* [AvOrganizations](#AvOrganizations)
* [AvProviders](#AvProviders)
* [AvLogMessage](#AvLogMessage)

## Intro
To see the details for configuring the resources see [AvApi](../README.md)

All are created with the same parameters as `AvApi` unless otherwise specified.

## AvUser

Used to get data about user by id
> All get calls have the user grabbed from data and returned or an empty array

`me()` makes the call to return the current users info.

## AvRegions

Used to get the current users current region as well as all available regions
> All queries have the regions grabbed from data and returned or an empty array

### Configuration
`AvRegions` requires an AvUser object, can use the `AvUser` predefined resource, or any object with a `.me()` promise that returns similar data.

### Methods

* `getRegions(config)`: used to grab regions for current user.
* `getCurrentRegion()`: Returns just the current region for the current user.

## AvPermissions

Used to get permissions belonging to the current user
> All queries have the permissions grabbed from data and returned or an empty array

## AvUserPermissions

Used to get permissions belonging to the current user using the `axi-user-permissions` API
> All queries have the permissions grabbed from data and returned or an empty array

## AvNavigation & AvSpaces
 > Used to call the navigation/spaces api's

## AvOrganizations
`AvOrganizations` is a service that allows you to get a user's active organizations.

> All queries have the organizations grabbed from data and returned or an empty array

### Configuration
`AvOrganizations` requires an AvUser object, can use the `AvUser` predefined resource, or any object with a `.me()` promise that returns similar data.

### Methods

#### queryOrganizations(user, config)

  Returns organizations belonging to the passed in user.
#### getOrganizations(config)

  Returns organizations belonging to the currently logged in User


## AvProviders

Used to get providers belonging to the current user
> All queries have the providers grabbed from data and returned or an empty array

## AvLogMessage

> Used to create log messages

### Methods

All methods take a entries object, remove it's level, and using the level of the function, call create with `{level, entries}`;
* debug
* info
* warn
* error
