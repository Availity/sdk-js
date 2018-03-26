<a name="1.0.1"></a>
## [1.0.1](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.17...v1.0.1) (2018-03-26)


### Bug Fixes

* **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392))
* **upload-core:** error handling ([14fa7ba](https://github.com/Availity/sdk-js/commit/14fa7ba))
* **upload-core:** fix test case ([831e1b4](https://github.com/Availity/sdk-js/commit/831e1b4))
* **upload-core:** move file type check to start ([b3dd3dd](https://github.com/Availity/sdk-js/commit/b3dd3dd))


### Features

* **upload-core:** upload core file types check ([#7](https://github.com/Availity/sdk-js/issues/7)) ([080d887](https://github.com/Availity/sdk-js/commit/080d887))
* **uploads:** capture error message ([#6](https://github.com/Availity/sdk-js/issues/6)) ([5af448e](https://github.com/Availity/sdk-js/commit/5af448e))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.17...v1.0.0) (2018-03-05)


### Features

* **upload-core:** upload core file types check ([#7](https://github.com/Availity/sdk-js/issues/7)) ([080d887](https://github.com/Availity/sdk-js/commit/080d887))
* **uploads:** capture error message ([#6](https://github.com/Availity/sdk-js/issues/6)) ([5af448e](https://github.com/Availity/sdk-js/commit/5af448e))



<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2018-01-18)


### Bug Fixes

* **upload-core:** serveral fixes ([1e0d0e4](https://github.com/Availity/sdk-js/commit/1e0d0e4))



<a name="1.0.0-alpha.16"></a>
# [1.0.0-alpha.16](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2018-01-17)


### Features

* **upload-core:** add progress indicator for file scans ([a84cc85](https://github.com/Availity/sdk-js/commit/a84cc85))



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2018-01-12)


### Bug Fixes

* **upload-core:** add additional headers ([9a10f16](https://github.com/Availity/sdk-js/commit/9a10f16))



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2018-01-11)



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2018-01-10)


### Features

* **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b24341))



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2018-01-09)



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2018-01-06)


### Bug Fixes

* **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1c))


### Code Refactoring

* **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c))


### BREAKING CHANGES

* **api-core:** Options to core classes are being passed in as config object instead of parameters. 



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2018-01-04)


### Bug Fixes

* **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6))


### BREAKING CHANGES

* **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.7...v1.0.0-alpha.9) (2018-01-03)


### Bug Fixes

* **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-01-03)



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/Availity/sdk-js/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-01-03)


### Bug Fixes

* **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a))



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



