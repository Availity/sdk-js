<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2017-12-20)


### Bug Fixes

* **api-core:** fix method call for notifcations ([9604973](https://github.com/Availity/sdk-js/commit/9604973)

<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2017-12-20)


### Bug Fixes

* **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc97))



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2017-12-20)


### Bug Fixes

* **api-angular:** fix service name for avNotificationsApi ([c79ee42](https://github.com/Availity/sdk-js/commit/c79ee42))
* **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c))



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2017-12-19)


### Bug Fixes

* **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616))



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-12-19)



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2017-12-19)


### Bug Fixes

* **api-core:** remove default after* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a))


### BREAKING CHANGES

* **api-core:** The core API classes no longer apply after* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
  response && response.data && response.data.user|| {};
}
```



