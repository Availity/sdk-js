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



