# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [12.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@11.0.1...@availity/api-core@12.0.0) (2025-11-10)


### Code Refactoring

* **api-axios, api-core:** remove slotmachine ([1fa331b](https://github.com/Availity/sdk-js/commit/1fa331bbf415daf60d61e9bfa057eb0295d0d52e))


### BREAKING CHANGES

* **api-axios, api-core:** avSlotmachineApi was removed



## [11.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@11.0.0...@availity/api-core@11.0.1) (2025-10-06)



# [11.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@10.0.3...@availity/api-core@11.0.0) (2025-05-14)


### chore

* drop support for node 18 and add support for node 22 ([1e3dcc3](https://github.com/Availity/sdk-js/commit/1e3dcc3311021edc5691b1383aa393ebebe1d9db))


### BREAKING CHANGES

* drop support for node 18



## [10.0.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@10.0.2...@availity/api-core@10.0.3) (2025-04-09)



## [10.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@10.0.1...@availity/api-core@10.0.2) (2025-03-14)



## [10.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@10.0.0...@availity/api-core@10.0.1) (2025-03-10)



# [10.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@9.0.1...@availity/api-core@10.0.0) (2025-02-10)


### Features

* **upload-core:** convert to ts ([e8f2b6c](https://github.com/Availity/sdk-js/commit/e8f2b6c3b30aeec8c26d306035a876ddcc0202fc))


### BREAKING CHANGES

* **upload-core:** update to the latest version of tus-js-client



## [9.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@9.0.0...@availity/api-core@9.0.1) (2024-10-04)



# [9.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.6...@availity/api-core@9.0.0) (2024-07-29)


### chore

* **api-core:** upgrade to node 18 and 20 ([0915080](https://github.com/Availity/sdk-js/commit/0915080a6a60b7061076126340be991fe33d3efc))


### BREAKING CHANGES

* **api-core:** drop support for node 14 and 16



## [8.0.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.5...@availity/api-core@8.0.6) (2024-07-29)



## [8.0.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.4...@availity/api-core@8.0.5) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96c1ad7b3b9b752d9376b88d9b91daabca6))
* **analytics-core:** fix non-click events ([fce9b26](https://github.com/Availity/sdk-js/commit/fce9b269534d490e29d3a06d4751b2ce27b0833f))
* **api-core:** adds @availity/env-var as dependency ([4160e21](https://github.com/Availity/sdk-js/commit/4160e21e68376f62749c8690ca4babbc8ac76a99))
* **api-core:** all should append individual items ([1bf476e](https://github.com/Availity/sdk-js/commit/1bf476e4125355bc45fbbd8895c7affc48c13bdc))
* **api-core:** Allow array for permissions ([#67](https://github.com/Availity/sdk-js/issues/67)) ([98adf76](https://github.com/Availity/sdk-js/commit/98adf76decab85ae76d6e8ef5825af18baf7e5e8))
* **api-core:** allow id to be in the config ([55b55af](https://github.com/Availity/sdk-js/commit/55b55af9aa57e0e9f04227ab2e73aabc68e37068))
* **api-core:** attempts count not increasing ([2e414a3](https://github.com/Availity/sdk-js/commit/2e414a3d6ea05d7004aa8d981c97f369eac4de4c))
* **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392d0fb6657ce6202ca4c59da66ee23c54b1))
* **api-core:** avSpaces - throw error when no spaceId given ([7c47280](https://github.com/Availity/sdk-js/commit/7c47280adb66d85473697893b8f14406fc81b101))
* **api-core:** check for lowercase location as well ([4a4a9a0](https://github.com/Availity/sdk-js/commit/4a4a9a04aba39d5a0364c9517a4201f50f7c2520))
* **api-core:** disable lint rule ([b506cdc](https://github.com/Availity/sdk-js/commit/b506cdc47dd90d8dd9941eeb1a4d7efcae2d03ec))
* **api-core:** do not use config url when resolving location header ([199536f](https://github.com/Availity/sdk-js/commit/199536f7f9cd7f5b50af42ba23f4478211289dd5))
* **api-core:** filesDelivery polling issue ([8e5f451](https://github.com/Availity/sdk-js/commit/8e5f4512e98537c5d8c530e97e51986b8debf16e))
* **api-core:** filteredOrgs not sending region to axiUserPerms ([3706a72](https://github.com/Availity/sdk-js/commit/3706a7274ac4cd67271e9088d6fa8b8392c49c83))
* **api-core:** fix clientId ([ed46ad4](https://github.com/Availity/sdk-js/commit/ed46ad490b3c026025c0b46a350507da2cc256cd))
* **api-core:** fix filteredOrgs arePermissionsEqual check ([c934bcc](https://github.com/Availity/sdk-js/commit/c934bcce302f42c34e71f551504f4828b596c157))
* **api-core:** fix flattenObject import ([8c4375e](https://github.com/Availity/sdk-js/commit/8c4375eae85ae3d70f5c16d5c5691a746bc1d38b))
* **api-core:** fix namespace of slotmachine resource ([3c3af84](https://github.com/Availity/sdk-js/commit/3c3af84d9e9dad863e46b97102ab1cab7276fe41))
* **api-core:** fix org filtering when permission/resource not returned ([7b08f09](https://github.com/Availity/sdk-js/commit/7b08f09fcb7545818a6d3aaacf9c6eabb3969ba7))
* **api-core:** fix organizations resources check ([28644b6](https://github.com/Availity/sdk-js/commit/28644b6431ba22df265225386e09aaec53f5a9e1))
* **api-core:** fix usage of Promise ([8fb3de8](https://github.com/Availity/sdk-js/commit/8fb3de8dcf1e242962b09afcb548848a406f00af))
* **api-core:** fixed error trying to call toString on undefined ([0792f85](https://github.com/Availity/sdk-js/commit/0792f85b8be73e2eb3bef465c181c7810746e981))
* **api-core:** format postGet payload to standard ([5b885cf](https://github.com/Availity/sdk-js/commit/5b885cf8148ebc2c8cd9c0bbd1314b88b24b9d40))
* **api-core:** get id out of arguments ([3e525c2](https://github.com/Availity/sdk-js/commit/3e525c265ab5f9cbc8a89053d4ebf4a18cd9d321))
* **api-core:** graceful exit when polling ([9708eff](https://github.com/Availity/sdk-js/commit/9708efff45bea08880b18e4b0f80aa6ff9409b49))
* **api-core:** http should throw errors ([#83](https://github.com/Availity/sdk-js/issues/83)) ([868aa8f](https://github.com/Availity/sdk-js/commit/868aa8fc3bab42869c1ba7365d4b0f3d0bd08277))
* **api-core:** organization filtering fix for resource OR ([cb16c6a](https://github.com/Availity/sdk-js/commit/cb16c6a36fbf7d653c9ff70a0555981001c21606))
* **api-core:** organization permissions fix equal check, allow number ([6fc93c1](https://github.com/Availity/sdk-js/commit/6fc93c114523350cad0d37d8167b5047707c33a9))
* **api-core:** pass region param to axi-user-permissions call if additionalPostGetArgs ([3a41740](https://github.com/Availity/sdk-js/commit/3a41740f0b241e112cef64643985c49908ed3578))
* **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d67727899e36bb4ead3850d1eb49df7fb9))
* **api-core:** relative location header ([2ac4c5f](https://github.com/Availity/sdk-js/commit/2ac4c5f8d618ad6c7eff0ef6a8b2fb2c20f339a8)), closes [#77](https://github.com/Availity/sdk-js/issues/77)
* **api-core:** remove default after* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a7d4187dabb3ef15efd0f93ebda47f943d))
* **api-core:** remove incorrect limit for axiUserPermissions in orgFilter ([edbddbf](https://github.com/Availity/sdk-js/commit/edbddbf2c7181d6ab634fc9fb5f0967d1d92d02b))
* **api-core:** remove type export ([2711dec](https://github.com/Availity/sdk-js/commit/2711decfb40c151c21c0491226bac94cc590960c))
* **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6b415cb01adcd5b672e39004ab7063dbf4))
* **api-core:** rename error object ([460fc9d](https://github.com/Availity/sdk-js/commit/460fc9dd59e9fbb5b29e28a0b46764074ea95c01))
* **api-core:** resolve relative url from request url ([8e6abbb](https://github.com/Availity/sdk-js/commit/8e6abbbc877a4cc9bffb41567cace96d7a5997c5)), closes [#77](https://github.com/Availity/sdk-js/issues/77)
* **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1cb0e512a4db18484e88f957488dcd2a690))
* **api-core:** return error from async/await ([06c35fe](https://github.com/Availity/sdk-js/commit/06c35fe4ac72adbee8bf4ab1ec4653521b8cf2bc))
* **api-core:** reverted changelog/canary changes ([0f775ea](https://github.com/Availity/sdk-js/commit/0f775ea034df998a6bd74a0409cc1e56ee9f6d7b))
* **api-core:** spread args for aliases ([5c7516b](https://github.com/Availity/sdk-js/commit/5c7516b25c8b0068cd11f120754eb126c573eec5))
* **api-core:** typo fix ([f543296](https://github.com/Availity/sdk-js/commit/f5432960ffdb430a302d68790eba9b9cd71308d1))
* **api-core:** updated handling of falsey values ([b810189](https://github.com/Availity/sdk-js/commit/b8101892bfc2ec50a58cceade051c23c59fd495d))
* **api-core:** updated test suite name ([b0a75c6](https://github.com/Availity/sdk-js/commit/b0a75c6ffc916581ff06aaf8eccba66ee80015ad))
* **api-core:** use correct region param for permissions call inside organizations ([724cc65](https://github.com/Availity/sdk-js/commit/724cc657bfc594ec10ed085003094a2dfac4b41d))
* **api-core:** use flat for lint ([dcabbdf](https://github.com/Availity/sdk-js/commit/dcabbdf97e9fd9d8cba101af31a0a22e9e704f64))
* **api-core:** use flat for lint with spread ([56b4cd9](https://github.com/Availity/sdk-js/commit/56b4cd979edc0af07b9a00682d999ae234bc9c95))
* **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a66023b78a18c4654cba05d2d362cd1a5b))
* **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616585f20b7c757b90221954403f99da5cc4))
* **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc975dc8b039a28f9accdb4ae8cd24414429b))
* **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c6c5bcbbf19d6d404a09b89c37f37d1a20))
* **dl-core:** fixed dev dep ([15d572a](https://github.com/Availity/sdk-js/commit/15d572a04e337bbecb60b414d5397ef2161f8042))
* fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f486e49eb969320edfbfab422d47abe4ab1))


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))
* **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c80837a8256bcf4538b30d042882db2640))
* **localstorage-core:** converted class to function ([9f1fdf0](https://github.com/Availity/sdk-js/commit/9f1fdf07e388cabbbc1da9ebd4016d6ba5dace8f))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### Features

* **analytics-core:** added dma logging service ([68aee41](https://github.com/Availity/sdk-js/commit/68aee41761e5a5960ee1e997e32e471aad455dc1))
* **api-core, api-angular api-react:** add pdf api ([b84a16f](https://github.com/Availity/sdk-js/commit/b84a16f39548aa405748ecf2a9431d3a05ff4ea0))
* **api-core:** add ability to send in variables in AvSlotMachine.query ([f83e00b](https://github.com/Availity/sdk-js/commit/f83e00b61680f882aeb7da906500d82065466ed3))
* **api-core:** add all method to get all the data from all of the pages ([114519d](https://github.com/Availity/sdk-js/commit/114519d855e16da37e965e06d6064e6641d70fde))
* **api-core:** add beacon support to log messages ([9350765](https://github.com/Availity/sdk-js/commit/93507657b78a68ff431e92f0bd3336b74e2199c4))
* **api-core:** add codes resource ([4ea7ba4](https://github.com/Availity/sdk-js/commit/4ea7ba41fcef02b67b2e4928b17a04eff2d8b9fd))
* **api-core:** add example response for file delivery ([edc4df5](https://github.com/Availity/sdk-js/commit/edc4df5763e58c1d94c88a4e6730e6a1ece651d8))
* **api-core:** add file upload delivery batch api ([eff0a3c](https://github.com/Availity/sdk-js/commit/eff0a3cff384d99d13d0fd0795e693eef5c51af2))
* **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b243412f3541fd8af6330c7f9986e86e0ddca59))
* **api-core:** add permission AND/OR logic to organization filter ([90acf02](https://github.com/Availity/sdk-js/commit/90acf029028413c9fb98443d136abb795295eb5c))
* **api-core:** add post and delete as synonyms for create and update ([0150680](https://github.com/Availity/sdk-js/commit/01506807b2917f4e5bc082ac16504ef88094fff6))
* **api-core:** add spaces helper methods ([72de394](https://github.com/Availity/sdk-js/commit/72de394bd51b9fea08345f42efade8d45ac9888f))
* **api-core:** add support for filtering organizations by permission and resource ([b607943](https://github.com/Availity/sdk-js/commit/b607943c9908d7d684013ec18678a1c05b9f1baf))
* **api-core:** add webQL resource ([67b9797](https://github.com/Availity/sdk-js/commit/67b9797718ac55d0a2a08d7e5e7513791dc82a28))
* **api-core:** added graphql resource for slotmachine ([356a686](https://github.com/Availity/sdk-js/commit/356a6868b24be6b5388000770d711bcce5e5fa00))
* **api-core:** added new resource for disclaimers ([b7de72e](https://github.com/Availity/sdk-js/commit/b7de72ed6d6c910a2571e18753bfee6a038837d7))
* **api-core:** added tests for new patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([5498a78](https://github.com/Availity/sdk-js/commit/5498a78f3e63567e40eb1b6bb1e035c3f70c124b))
* **api-core:** helper function for settings api ([4d405a7](https://github.com/Availity/sdk-js/commit/4d405a726c051b2602c4c19a2b8c02b0c4d87e6e))
* **api-core:** helper function for settings api ([#64](https://github.com/Availity/sdk-js/issues/64)) ([f247235](https://github.com/Availity/sdk-js/commit/f2472358bfef0744ec31e7b764ae1586b314af6b))
* **api-core:** proposed support for patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([2ff4085](https://github.com/Availity/sdk-js/commit/2ff40857dd9d36b383278f4c4743e45de511ddee))
* **api-core:** refactor polling for extending MS ([04c1474](https://github.com/Availity/sdk-js/commit/04c1474375d5d0c9ad387c23a453951b83d94425))
* **api-core:** route api calls to on-prem when called from cloud apps ([94fa9df](https://github.com/Availity/sdk-js/commit/94fa9dff730e514fd21abe0910d460e7958e9a94))


### Performance Improvements

* **api-core:** use userId from params if it exists in getOrganizations ([5e5225f](https://github.com/Availity/sdk-js/commit/5e5225ff95b915d7a3145eee16281d25eb3760d6))
* **api-core:** use userId if it exists in call to getRegions ([e94de9e](https://github.com/Availity/sdk-js/commit/e94de9eb3f4d04247ba6bc1f76ce3deb4341e609))
* **api-core:** use userId if it exists in get,set application settings ([6cdd059](https://github.com/Availity/sdk-js/commit/6cdd05974ebcfabcabb150165b1accd03a64bf0e))


### BREAKING CHANGES

* Drop Internet Explorer support
* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of
* **localstorage-core:** Class is now a Function and doesn't require to be instantiated.
* upgrades other packages that are using old package-locks
* **api-core:** The httpp error is no longer caught by api-core. Also, the error object is no longer manipulated. Developers must handle the http error by catching the error when using async/await or by leveraging the error callback in the promise chain. The callback `afterResponse` is not called when and error is thrown from http call.
* **api-core:** The query to the API has been changed. To get the previous behavior, supply a custom paramSerializer.
* **api-core:** Options to core classes are being passed in as config object instead of parameters. 
* **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.
* **api-core:** The core API classes no longer apply after* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
  response && response.data && response.data.user|| {};
}
```



## [8.0.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.3...@availity/api-core@8.0.4) (2022-08-01)



## [8.0.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.2...@availity/api-core@8.0.3) (2022-06-15)



## [8.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.1...@availity/api-core@8.0.2) (2022-05-24)



## [8.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@8.0.0...@availity/api-core@8.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [8.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.8...@availity/api-core@8.0.0) (2022-04-28)


### Bug Fixes

* **api-core:** remove type export ([2711dec](https://github.com/Availity/sdk-js/commit/2711decfb40c151c21c0491226bac94cc590960c))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



## [7.0.8](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.7...@availity/api-core@7.0.8) (2022-02-22)

**Note:** Version bump only for package @availity/api-core





## 7.0.7 (2021-12-21)

**Note:** Version bump only for package @availity/api-core





## [7.0.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.5...@availity/api-core@7.0.6) (2021-10-29)

**Note:** Version bump only for package @availity/api-core





## 7.0.5 (2021-10-22)


### Bug Fixes

* **api-core:** disable lint rule ([b506cdc](https://github.com/Availity/sdk-js/commit/b506cdc47dd90d8dd9941eeb1a4d7efcae2d03ec))





## 7.0.4 (2021-09-30)


### Bug Fixes

* **api-core:** fix organizations resources check ([28644b6](https://github.com/Availity/sdk-js/commit/28644b6431ba22df265225386e09aaec53f5a9e1))





## 7.0.3 (2021-09-16)

**Note:** Version bump only for package @availity/api-core





## [7.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.1...@availity/api-core@7.0.2) (2021-05-25)


### Bug Fixes

* **api-core:** all should append individual items ([1bf476e](https://github.com/Availity/sdk-js/commit/1bf476e4125355bc45fbbd8895c7affc48c13bdc))
* **api-core:** use flat for lint ([dcabbdf](https://github.com/Availity/sdk-js/commit/dcabbdf97e9fd9d8cba101af31a0a22e9e704f64))
* **api-core:** use flat for lint with spread ([56b4cd9](https://github.com/Availity/sdk-js/commit/56b4cd979edc0af07b9a00682d999ae234bc9c95))





## [7.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.0...@availity/api-core@7.0.1) (2021-05-20)


### Bug Fixes

* **api-core:** fix flattenObject import ([8c4375e](https://github.com/Availity/sdk-js/commit/8c4375eae85ae3d70f5c16d5c5691a746bc1d38b))





# [7.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.6...@availity/api-core@7.0.0) (2021-05-17)


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))


### BREAKING CHANGES

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of





## 6.6.6 (2021-04-01)


### Bug Fixes

* **api-core:** pass region param to axi-user-permissions call if additionalPostGetArgs ([3a41740](https://github.com/Availity/sdk-js/commit/3a41740f0b241e112cef64643985c49908ed3578))
* **api-core:** use correct region param for permissions call inside organizations ([724cc65](https://github.com/Availity/sdk-js/commit/724cc657bfc594ec10ed085003094a2dfac4b41d))





## 6.6.5 (2020-12-16)


### Bug Fixes

* **api-core:** fix clientId ([ed46ad4](https://github.com/Availity/sdk-js/commit/ed46ad490b3c026025c0b46a350507da2cc256cd))





## [6.6.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.3...@availity/api-core@6.6.4) (2020-08-24)


### Bug Fixes

* **api-core:** filesDelivery polling issue ([8e5f451](https://github.com/Availity/sdk-js/commit/8e5f4512e98537c5d8c530e97e51986b8debf16e))





## [6.6.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.2...@availity/api-core@6.6.3) (2020-07-08)


### Bug Fixes

* **api-core:** fix filteredOrgs arePermissionsEqual check ([c934bcc](https://github.com/Availity/sdk-js/commit/c934bcce302f42c34e71f551504f4828b596c157))





## [6.6.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.1...@availity/api-core@6.6.2) (2020-06-22)

**Note:** Version bump only for package @availity/api-core





## [6.6.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.0...@availity/api-core@6.6.1) (2020-06-15)


### Bug Fixes

* **api-core:** adds @availity/env-var as dependency ([4160e21](https://github.com/Availity/sdk-js/commit/4160e21e68376f62749c8690ca4babbc8ac76a99))





# [6.6.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.2...@availity/api-core@6.6.0) (2020-06-08)


### Bug Fixes

* **api-core:** fix org filtering when permission/resource not returned ([7b08f09](https://github.com/Availity/sdk-js/commit/7b08f09fcb7545818a6d3aaacf9c6eabb3969ba7))
* **api-core:** organization filtering fix for resource OR ([cb16c6a](https://github.com/Availity/sdk-js/commit/cb16c6a36fbf7d653c9ff70a0555981001c21606))
* **api-core:** organization permissions fix equal check, allow number ([6fc93c1](https://github.com/Availity/sdk-js/commit/6fc93c114523350cad0d37d8167b5047707c33a9))


### Features

* **api-core:** add permission AND/OR logic to organization filter ([90acf02](https://github.com/Availity/sdk-js/commit/90acf029028413c9fb98443d136abb795295eb5c))





## [6.5.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.1...@availity/api-core@6.5.2) (2020-06-04)


### Bug Fixes

* **api-core:** remove incorrect limit for axiUserPermissions in orgFilter ([edbddbf](https://github.com/Availity/sdk-js/commit/edbddbf2c7181d6ab634fc9fb5f0967d1d92d02b))





## [6.5.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.0...@availity/api-core@6.5.1) (2020-06-04)


### Bug Fixes

* **api-core:** filteredOrgs not sending region to axiUserPerms ([3706a72](https://github.com/Availity/sdk-js/commit/3706a7274ac4cd67271e9088d6fa8b8392c49c83))





# 6.5.0 (2020-06-04)


### Features

* **api-core:** route api calls to on-prem when called from cloud apps ([94fa9df](https://github.com/Availity/sdk-js/commit/94fa9dff730e514fd21abe0910d460e7958e9a94))





# 6.4.0 (2020-06-03)


### Bug Fixes

* **api-core:** fix org filtering when permission/resource not returned ([7b08f09](https://github.com/Availity/sdk-js/commit/7b08f09fcb7545818a6d3aaacf9c6eabb3969ba7))
* **api-core:** organization filtering fix for resource OR ([cb16c6a](https://github.com/Availity/sdk-js/commit/cb16c6a36fbf7d653c9ff70a0555981001c21606))
* **api-core:** organization permissions fix equal check, allow number ([6fc93c1](https://github.com/Availity/sdk-js/commit/6fc93c114523350cad0d37d8167b5047707c33a9))


### Features

* **api-core:** add permission AND/OR logic to organization filter ([90acf02](https://github.com/Availity/sdk-js/commit/90acf029028413c9fb98443d136abb795295eb5c))





# [6.3.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.2.6...@availity/api-core@6.3.0) (2020-05-11)


### Features

* **api-core:** add support for filtering organizations by permission and resource ([b607943](https://github.com/Availity/sdk-js/commit/b607943c9908d7d684013ec18678a1c05b9f1baf))





## 6.2.6 (2020-05-01)

**Note:** Version bump only for package @availity/api-core





## 6.2.5 (2020-04-30)

**Note:** Version bump only for package @availity/api-core





## 6.2.4 (2020-04-22)

**Note:** Version bump only for package @availity/api-core





## 6.2.3 (2020-04-08)

**Note:** Version bump only for package @availity/api-core





## 6.2.2 (2020-04-06)

**Note:** Version bump only for package @availity/api-core





## 6.2.1 (2020-04-06)

**Note:** Version bump only for package @availity/api-core





# [6.2.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.16...@availity/api-core@6.2.0) (2020-03-25)


### Features

* **api-core:** added tests for new patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([5498a78](https://github.com/Availity/sdk-js/commit/5498a78f3e63567e40eb1b6bb1e035c3f70c124b))
* **api-core:** proposed support for patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([2ff4085](https://github.com/Availity/sdk-js/commit/2ff40857dd9d36b383278f4c4743e45de511ddee))





## [6.1.16](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.15...@availity/api-core@6.1.16) (2020-03-06)

**Note:** Version bump only for package @availity/api-core





## [6.1.15](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.14...@availity/api-core@6.1.15) (2020-03-04)

**Note:** Version bump only for package @availity/api-core





## [6.1.14](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.13...@availity/api-core@6.1.14) (2020-03-02)

**Note:** Version bump only for package @availity/api-core





## [6.1.13](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.12...@availity/api-core@6.1.13) (2020-02-18)


### Performance Improvements

* **api-core:** use userId if it exists in call to getRegions ([e94de9e](https://github.com/Availity/sdk-js/commit/e94de9eb3f4d04247ba6bc1f76ce3deb4341e609))





## [6.1.12](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.9...@availity/api-core@6.1.12) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.11](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.10...@availity/api-core@6.1.11) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.10](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.8...@availity/api-core@6.1.10) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.9](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.7...@availity/api-core@6.1.9) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.8](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.7...@availity/api-core@6.1.8) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.7](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.4...@availity/api-core@6.1.7) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.5...@availity/api-core@6.1.6) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.4...@availity/api-core@6.1.5) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.3...@availity/api-core@6.1.4) (2020-02-12)

**Note:** Version bump only for package @availity/api-core





## [6.1.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.2...@availity/api-core@6.1.3) (2020-01-28)

**Note:** Version bump only for package @availity/api-core





## [6.1.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.1...@availity/api-core@6.1.2) (2020-01-23)

**Note:** Version bump only for package @availity/api-core





## [6.1.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.0...@availity/api-core@6.1.1) (2020-01-14)

### Bug Fixes

-   **api-core:** fixed error trying to call toString on undefined ([0792f85](https://github.com/Availity/sdk-js/commit/0792f85))
-   **api-core:** updated handling of falsey values ([b810189](https://github.com/Availity/sdk-js/commit/b810189))
-   **api-core:** updated test suite name ([b0a75c6](https://github.com/Availity/sdk-js/commit/b0a75c6))

# [6.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.5...@availity/api-core@6.1.0) (2020-01-06)

### Features

-   **api-core:** add beacon support to log messages ([9350765](https://github.com/Availity/sdk-js/commit/9350765))

## [6.0.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.4...@availity/api-core@6.0.5) (2020-01-03)

**Note:** Version bump only for package @availity/api-core

## [6.0.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.3...@availity/api-core@6.0.4) (2020-01-03)

**Note:** Version bump only for package @availity/api-core

## [6.0.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.2...@availity/api-core@6.0.3) (2019-12-03)

### Performance Improvements

-   **api-core:** use userId if it exists in get,set application settings ([6cdd059](https://github.com/Availity/sdk-js/commit/6cdd059))

## [6.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.1...@availity/api-core@6.0.2) (2019-12-02)

### Performance Improvements

-   **api-core:** use userId from params if it exists in getOrganizations ([5e5225f](https://github.com/Availity/sdk-js/commit/5e5225f))

## [6.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.0...@availity/api-core@6.0.1) (2019-11-05)

### Bug Fixes

-   **api-core:** do not use config url when resolving location header ([199536f](https://github.com/Availity/sdk-js/commit/199536f))

# [6.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.4.1...@availity/api-core@6.0.0) (2019-10-21)

### Code Refactoring

-   **localstorage-core:** converted class to function ([9f1fdf0](https://github.com/Availity/sdk-js/commit/9f1fdf0))

### BREAKING CHANGES

-   **localstorage-core:** Class is now a Function and doesn't require to be instantiated.

## [5.4.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.4.0...@availity/api-core@5.4.1) (2019-09-27)

**Note:** Version bump only for package @availity/api-core

# [5.4.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.1...@availity/api-core@5.4.0) (2019-08-01)

### Features

-   **api-core:** add webQL resource ([67b9797](https://github.com/Availity/sdk-js/commit/67b9797))

# [5.3.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.1...@availity/api-core@5.3.0) (2019-08-01)

### Features

-   **api-core:** add webQL resource ([67b9797](https://github.com/Availity/sdk-js/commit/67b9797))

## [5.2.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.0...@availity/api-core@5.2.1) (2019-06-21)

### Bug Fixes

-   **api-core:** fix namespace of slotmachine resource ([3c3af84](https://github.com/Availity/sdk-js/commit/3c3af84))

# [5.2.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.6...@availity/api-core@5.2.0) (2019-06-14)

### Features

-   **api-core:** add codes resource ([4ea7ba4](https://github.com/Availity/sdk-js/commit/4ea7ba4))

## [5.1.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.5...@availity/api-core@5.1.6) (2019-05-31)

### Bug Fixes

-   **api-core:** graceful exit when polling ([9708eff](https://github.com/Availity/sdk-js/commit/9708eff))

## [5.1.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.4...@availity/api-core@5.1.5) (2019-04-29)

**Note:** Version bump only for package @availity/api-core

## [5.1.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.3...@availity/api-core@5.1.4) (2019-04-26)

**Note:** Version bump only for package @availity/api-core

## [5.1.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.2...@availity/api-core@5.1.3) (2019-04-25)

**Note:** Version bump only for package @availity/api-core

## [5.1.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.1...@availity/api-core@5.1.2) (2019-04-25)

**Note:** Version bump only for package @availity/api-core

## [5.1.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.0...@availity/api-core@5.1.1) (2019-04-23)

### Bug Fixes

-   **api-core:** relative location header ([2ac4c5f](https://github.com/Availity/sdk-js/commit/2ac4c5f)), closes [#77](https://github.com/Availity/sdk-js/issues/77)
-   **api-core:** resolve relative url from request url ([8e6abbb](https://github.com/Availity/sdk-js/commit/8e6abbb)), closes [#77](https://github.com/Availity/sdk-js/issues/77)

# [5.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.0.1...@availity/api-core@5.1.0) (2019-04-17)

### Features

-   **analytics-core:** added dma logging service ([68aee41](https://github.com/Availity/sdk-js/commit/68aee41))

## [5.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.0.0...@availity/api-core@5.0.1) (2019-04-17)

**Note:** Version bump only for package @availity/api-core

# [5.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.1...@availity/api-core@5.0.0) (2019-03-18)

### Bug Fixes

-   **dl-core:** fixed dev dep ([15d572a](https://github.com/Availity/sdk-js/commit/15d572a))
-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))

### Features

-   **api-core:** add ability to send in variables in AvSlotMachine.query ([f83e00b](https://github.com/Availity/sdk-js/commit/f83e00b))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

# [4.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.1...@availity/api-core@4.1.0) (2019-03-04)

### Bug Fixes

-   **dl-core:** fixed dev dep ([15d572a](https://github.com/Availity/sdk-js/commit/15d572a))
-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))

### Features

-   **api-core:** add ability to send in variables in AvSlotMachine.query ([f83e00b](https://github.com/Availity/sdk-js/commit/f83e00b))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

## [4.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.0...@availity/api-core@4.0.1) (2019-02-12)

**Note:** Version bump only for package @availity/api-core

# 4.0.0 (2019-02-12)

### Bug Fixes

-   **api-core:** Allow array for permissions ([#67](https://github.com/Availity/sdk-js/issues/67)) ([98adf76](https://github.com/Availity/sdk-js/commit/98adf76))
-   **api-core:** http should throw errors ([#83](https://github.com/Availity/sdk-js/issues/83)) ([868aa8f](https://github.com/Availity/sdk-js/commit/868aa8f))
-   **api-core:** rename error object ([460fc9d](https://github.com/Availity/sdk-js/commit/460fc9d))
-   **api-core:** return error from async/await ([06c35fe](https://github.com/Availity/sdk-js/commit/06c35fe))
-   **api-core:** reverted changelog/canary changes ([0f775ea](https://github.com/Availity/sdk-js/commit/0f775ea))
-   **api-core:** typo fix ([f543296](https://github.com/Availity/sdk-js/commit/f543296))

### Features

-   **api-core:** add example response for file delivery ([edc4df5](https://github.com/Availity/sdk-js/commit/edc4df5))
-   **api-core:** add file upload delivery batch api ([eff0a3c](https://github.com/Availity/sdk-js/commit/eff0a3c))
-   **api-core:** added graphql resource for slotmachine ([356a686](https://github.com/Availity/sdk-js/commit/356a686))
-   **api-core:** added new resource for disclaimers ([b7de72e](https://github.com/Availity/sdk-js/commit/b7de72e))

### BREAKING CHANGES

-   **api-core:** The httpp error is no longer caught by api-core. Also, the error object is no longer manipulated. Developers must handle the http error by catching the error when using async/await or by leveraging the error callback in the promise chain. The callback `afterResponse` is not called when and error is thrown from http call.
-   **api-core:** The query to the API has been changed. To get the previous behavior, supply a custom paramSerializer.

# 2.6.0 (2018-08-23)

### Features

-   **api-core:** helper function for settings api ([4d405a7](https://github.com/Availity/sdk-js/commit/4d405a7))
-   **api-core:** helper function for settings api ([#64](https://github.com/Availity/sdk-js/issues/64)) ([f247235](https://github.com/Availity/sdk-js/commit/f247235))

# 2.5.0 (2018-08-20)

## 2.4.8 (2018-08-06)

### Bug Fixes

-   **api-core:** spread args for aliases ([5c7516b](https://github.com/Availity/sdk-js/commit/5c7516b))

## 2.4.7 (2018-08-02)

### Bug Fixes

-   **api-core:** check for lowercase location as well ([4a4a9a0](https://github.com/Availity/sdk-js/commit/4a4a9a0))

## 2.4.6 (2018-08-02)

### Bug Fixes

-   **analytics-core:** fix non-click events ([fce9b26](https://github.com/Availity/sdk-js/commit/fce9b26))

# 2.4.0 (2018-07-12)

# 2.2.0 (2018-06-29)

### Bug Fixes

-   **api-core:** format postGet payload to standard ([5b885cf](https://github.com/Availity/sdk-js/commit/5b885cf))

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **api-core:** attempts count not increasing ([2e414a3](https://github.com/Availity/sdk-js/commit/2e414a3))

## 2.1.1 (2018-05-25)

### Bug Fixes

-   **api-core:** fix usage of Promise ([8fb3de8](https://github.com/Availity/sdk-js/commit/8fb3de8))

# 2.1.0 (2018-05-24)

### Features

-   **api-core:** add all method to get all the data from all of the pages ([114519d](https://github.com/Availity/sdk-js/commit/114519d))

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **api-core:** allow id to be in the config ([55b55af](https://github.com/Availity/sdk-js/commit/55b55af))

## 2.0.1 (2018-05-04)

### Bug Fixes

-   **api-core:** get id out of arguments ([3e525c2](https://github.com/Availity/sdk-js/commit/3e525c2))

# 2.0.0 (2018-05-04)

### Bug Fixes

-   **api-core:** avSpaces - throw error when no spaceId given ([7c47280](https://github.com/Availity/sdk-js/commit/7c47280))

# 1.4.0 (2018-04-17)

# 1.2.0 (2018-04-12)

### Features

-   **api-core:** refactor polling for extending MS ([04c1474](https://github.com/Availity/sdk-js/commit/04c1474))

## 1.1.1 (2018-03-28)

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392))

# 1.0.0-alpha.17 (2018-01-18)

# 1.0.0-alpha.16 (2018-01-17)

# 1.0.0-alpha.15 (2018-01-12)

# 1.0.0-alpha.14 (2018-01-11)

# 1.0.0-alpha.13 (2018-01-10)

### Features

-   **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b24341))

# 1.0.0-alpha.12 (2018-01-09)

# 1.0.0-alpha.11 (2018-01-06)

### Bug Fixes

-   **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1c))

### Code Refactoring

-   **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c))

### BREAKING CHANGES

-   **api-core:** Options to core classes are being passed in as config object instead of parameters.

# 1.0.0-alpha.10 (2018-01-04)

### Bug Fixes

-   **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6))

### BREAKING CHANGES

-   **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.

# 1.0.0-alpha.9 (2018-01-03)

### Bug Fixes

-   **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d))

# 1.0.0-alpha.8 (2018-01-03)

# 1.0.0-alpha.7 (2018-01-03)

### Bug Fixes

-   **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a))

# 1.0.0-alpha.6 (2017-12-20)

# 1.0.0-alpha.5 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc97))

# 1.0.0-alpha.4 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c))

# 1.0.0-alpha.3 (2017-12-19)

### Bug Fixes

-   **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616))

# 1.0.0-alpha.2 (2017-12-19)

# 1.0.0-alpha.1 (2017-12-19)

### Bug Fixes

-   **api-core:** remove default after\* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a))

### BREAKING CHANGES

-   **api-core:** The core API classes no longer apply after\* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
  response && response.data && response.data.user|| {};
}
```

# 1.0.0-alpha.0 (2017-12-05)

### Features

-   **api-core:** add post and delete as synonyms for create and update ([0150680](https://github.com/Availity/sdk-js/commit/0150680))
-   **api-core:** add spaces helper methods ([72de394](https://github.com/Availity/sdk-js/commit/72de394))
-   **api-core, api-angular api-react:** add pdf api ([b84a16f](https://github.com/Availity/sdk-js/commit/b84a16f))


      <a name="3.0.0"></a>

# 3.0.0 (2018-11-20)

### Bug Fixes

-   **api-core:** Allow array for permissions ([#67](https://github.com/Availity/sdk-js/issues/67)) ([98adf76](https://github.com/Availity/sdk-js/commit/98adf76))
-   **api-core:** typo fix ([f543296](https://github.com/Availity/sdk-js/commit/f543296))

### Features

-   **api-core:** add example response for file delivery ([edc4df5](https://github.com/Availity/sdk-js/commit/edc4df5))
-   **api-core:** add file upload delivery batch api ([eff0a3c](https://github.com/Availity/sdk-js/commit/eff0a3c))

### BREAKING CHANGES

-   **api-core:** The query to the API has been changed. To get the previous behavior, supply a custom paramSerializer.

<a name="2.6.0"></a>

# 2.6.0 (2018-08-23)

### Features

-   **api-core:** helper function for settings api ([4d405a7](https://github.com/Availity/sdk-js/commit/4d405a7))
-   **api-core:** helper function for settings api ([#64](https://github.com/Availity/sdk-js/issues/64)) ([f247235](https://github.com/Availity/sdk-js/commit/f247235))

<a name="2.5.0"></a>

# 2.5.0 (2018-08-20)

<a name="2.4.8"></a>

## 2.4.8 (2018-08-06)

### Bug Fixes

-   **api-core:** spread args for aliases ([5c7516b](https://github.com/Availity/sdk-js/commit/5c7516b))

<a name="2.4.7"></a>

## 2.4.7 (2018-08-02)

### Bug Fixes

-   **api-core:** check for lowercase location as well ([4a4a9a0](https://github.com/Availity/sdk-js/commit/4a4a9a0))

<a name="2.4.6"></a>

## 2.4.6 (2018-08-02)

### Bug Fixes

-   **analytics-core:** fix non-click events ([fce9b26](https://github.com/Availity/sdk-js/commit/fce9b26))

<a name="2.4.0"></a>

# 2.4.0 (2018-07-12)

<a name="2.3.3"></a>

## 2.3.3 (2018-07-12)

<a name="2.2.0"></a>

# 2.2.0 (2018-06-29)

### Bug Fixes

-   **api-core:** format postGet payload to standard ([5b885cf](https://github.com/Availity/sdk-js/commit/5b885cf))

<a name="2.1.2"></a>

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **api-core:** attempts count not increasing ([2e414a3](https://github.com/Availity/sdk-js/commit/2e414a3))

<a name="2.1.1"></a>

## 2.1.1 (2018-05-25)

### Bug Fixes

-   **api-core:** fix usage of Promise ([8fb3de8](https://github.com/Availity/sdk-js/commit/8fb3de8))

<a name="2.1.0"></a>

# 2.1.0 (2018-05-24)

### Features

-   **api-core:** add all method to get all the data from all of the pages ([114519d](https://github.com/Availity/sdk-js/commit/114519d))

<a name="2.0.3"></a>

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **api-core:** allow id to be in the config ([55b55af](https://github.com/Availity/sdk-js/commit/55b55af))

<a name="2.0.1"></a>

## 2.0.1 (2018-05-04)

### Bug Fixes

-   **api-core:** get id out of arguments ([3e525c2](https://github.com/Availity/sdk-js/commit/3e525c2))

<a name="2.0.0"></a>

# 2.0.0 (2018-05-04)

### Bug Fixes

-   **api-core:** avSpaces - throw error when no spaceId given ([7c47280](https://github.com/Availity/sdk-js/commit/7c47280))

<a name="1.4.0"></a>

# 1.4.0 (2018-04-17)

<a name="1.2.0"></a>

# 1.2.0 (2018-04-12)

### Features

-   **api-core:** refactor polling for extending MS ([04c1474](https://github.com/Availity/sdk-js/commit/04c1474))

<a name="1.1.1"></a>

## 1.1.1 (2018-03-28)

<a name="1.0.1"></a>

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392))

<a name="1.0.0-alpha.17"></a>

# 1.0.0-alpha.17 (2018-01-18)

<a name="1.0.0-alpha.16"></a>

# 1.0.0-alpha.16 (2018-01-17)

<a name="1.0.0-alpha.15"></a>

# 1.0.0-alpha.15 (2018-01-12)

<a name="1.0.0-alpha.14"></a>

# 1.0.0-alpha.14 (2018-01-11)

<a name="1.0.0-alpha.13"></a>

# 1.0.0-alpha.13 (2018-01-10)

### Features

-   **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b24341))

<a name="1.0.0-alpha.12"></a>

# 1.0.0-alpha.12 (2018-01-09)

<a name="1.0.0-alpha.11"></a>

# 1.0.0-alpha.11 (2018-01-06)

### Bug Fixes

-   **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1c))

### Code Refactoring

-   **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c))

### BREAKING CHANGES

-   **api-core:** Options to core classes are being passed in as config object instead of parameters.

<a name="1.0.0-alpha.10"></a>

# 1.0.0-alpha.10 (2018-01-04)

### Bug Fixes

-   **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6))

### BREAKING CHANGES

-   **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.

<a name="1.0.0-alpha.9"></a>

# 1.0.0-alpha.9 (2018-01-03)

### Bug Fixes

-   **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d))

<a name="1.0.0-alpha.8"></a>

# 1.0.0-alpha.8 (2018-01-03)

<a name="1.0.0-alpha.7"></a>

# 1.0.0-alpha.7 (2018-01-03)

### Bug Fixes

-   **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a))

<a name="1.0.0-alpha.6"></a>

# 1.0.0-alpha.6 (2017-12-20)

<a name="1.0.0-alpha.5"></a>

# 1.0.0-alpha.5 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc97))

<a name="1.0.0-alpha.4"></a>

# 1.0.0-alpha.4 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c))

<a name="1.0.0-alpha.3"></a>

# 1.0.0-alpha.3 (2017-12-19)

### Bug Fixes

-   **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616))

<a name="1.0.0-alpha.2"></a>

# 1.0.0-alpha.2 (2017-12-19)

<a name="1.0.0-alpha.1"></a>

# 1.0.0-alpha.1 (2017-12-19)

### Bug Fixes

-   **api-core:** remove default after\* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a))

### BREAKING CHANGES

-   **api-core:** The core API classes no longer apply after\* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
response && response.data && response.data.user|| {};
}
```

<a name="1.0.0-alpha.0"></a>

# 1.0.0-alpha.0 (2017-12-05)

### Features

-   **api-core:** add post and delete as synonyms for create and update ([0150680](https://github.com/Availity/sdk-js/commit/0150680))
-   **api-core:** add spaces helper methods ([72de394](https://github.com/Availity/sdk-js/commit/72de394))
-   **api-core, api-angular api-react:** add pdf api ([b84a16f](https://github.com/Availity/sdk-js/commit/b84a16f))
