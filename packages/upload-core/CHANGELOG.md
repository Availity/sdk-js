# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [6.0.3](https://github.com/Availity/sdk-js/compare/@availity/upload-core@6.0.2...@availity/upload-core@6.0.3) (2024-10-22)


### Bug Fixes

* **upload-core:** update types ([09936a3](https://github.com/Availity/sdk-js/commit/09936a36a38400cdce628a46eed3552b14fb3247))



## [6.0.2](https://github.com/Availity/sdk-js/compare/@availity/upload-core@6.0.1...@availity/upload-core@6.0.2) (2024-10-21)


### Bug Fixes

* **upload-core:** update types ([3f141ea](https://github.com/Availity/sdk-js/commit/3f141ead5c0675df61dafc80c1cf4c2688f5cb23))



## [6.0.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@6.0.0...@availity/upload-core@6.0.1) (2024-09-24)


### Bug Fixes

* **upload-core:** parse S3-References ([978256a](https://github.com/Availity/sdk-js/commit/978256acbc1291c1d04f7facbe4a994258c87ba8))



# [6.0.0](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.8...@availity/upload-core@6.0.0) (2024-07-29)

### Dependency Updates

* `@availity/resolve-url` updated to version `5.0.8`

### chore

* **upload-core:** upgrade to node 18 and 20 ([85c9cf6](https://github.com/Availity/sdk-js/commit/85c9cf62093fbf692665b027fea0e2b230578370))


### BREAKING CHANGES

* **upload-core:** drop support for node 14 and 16



## [5.0.8](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.7...@availity/upload-core@5.0.8) (2024-07-29)

### Dependency Updates

* `@availity/resolve-url` updated to version `5.0.7`


## [5.0.7](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.6...@availity/upload-core@5.0.7) (2024-05-30)

### Dependency Updates

* `resolve-url` updated to version `5.0.6`


## [5.0.6](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.5...@availity/upload-core@5.0.6) (2024-04-22)


### Bug Fixes

* **upload-core:** change chunk size to 5MB ([3946ea1](https://github.com/Availity/sdk-js/commit/3946ea1a996732fce92657cfa1aee8d3705cf797))



## [5.0.5](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.4...@availity/upload-core@5.0.5) (2024-02-19)



## [5.0.4](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.3...@availity/upload-core@5.0.4) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96c1ad7b3b9b752d9376b88d9b91daabca6))
* fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f486e49eb969320edfbfab422d47abe4ab1))
* **POCL-2710:** fixed build issues. ([d63daee](https://github.com/Availity/sdk-js/commit/d63daee4c112567386d0a08ebd0c1cbbf6a75a30))
* **POCL-2710:** fixed missing setError. ([2ae4e65](https://github.com/Availity/sdk-js/commit/2ae4e6570bbc7c85fb7b91f28ab6b802ccde1760))
* **POCL-2710:** fixed missing this [#2](https://github.com/Availity/sdk-js/issues/2). ([53d7846](https://github.com/Availity/sdk-js/commit/53d7846112ce76bffa8fb90df3c9015523526ca0))
* **POCL-2710:** fixed Promise [#2](https://github.com/Availity/sdk-js/issues/2). ([c3b99f6](https://github.com/Availity/sdk-js/commit/c3b99f6ab45eab15d1ab6a6d680e4017a7b132f6))
* **POCL-2710:** fixed Promise. ([e258aa0](https://github.com/Availity/sdk-js/commit/e258aa02860428d7409e6366bebdcd09384be752))
* **upload-core:** add additional headers ([9a10f16](https://github.com/Availity/sdk-js/commit/9a10f16f70238844e582d2978c4ad4bb16b7508b))
* **upload-core:** add max file size ([447dd00](https://github.com/Availity/sdk-js/commit/447dd00d183a85042dffd96754e98b520817cdca))
* **upload-core:** add test cases ([86409f8](https://github.com/Availity/sdk-js/commit/86409f8a18f73327e8c3853d4dde66c699444a18))
* **upload-core:** added test ([463bfce](https://github.com/Availity/sdk-js/commit/463bfce39148a8a32f94c93b7daaa8cb66350cf6))
* **upload-core:** added this to cb() method for onPreStart ([68ed9ac](https://github.com/Availity/sdk-js/commit/68ed9ac888e74cf2e4a1d68052b5db38fdaff531))
* **upload-core:** adds max amount of retries to av scan polling ([5175754](https://github.com/Availity/sdk-js/commit/51757544e361bdad926d1ce0495e5766c56e1ba3))
* **upload-core:** auto retry failed uploads ([#73](https://github.com/Availity/sdk-js/issues/73)) ([c602275](https://github.com/Availity/sdk-js/commit/c60227585082bd18fd4d539154a3fca83dbfbcf7)), closes [#71](https://github.com/Availity/sdk-js/issues/71)
* **upload-core:** change error name for lint ([1d3ae92](https://github.com/Availity/sdk-js/commit/1d3ae924db57850759176bf45d073582b4bd2a03))
* **upload-core:** change message when file is decrypting ([416a654](https://github.com/Availity/sdk-js/commit/416a654252c2073603f316a4005424833ec9b446))
* **upload-core:** check xhr error message from header ([1609d58](https://github.com/Availity/sdk-js/commit/1609d581d77895ca01ba3f0891c6ec45d013972b))
* **upload-core:** error handling ([14fa7ba](https://github.com/Availity/sdk-js/commit/14fa7bae4830aa09c4f580a208466b5badd2606d))
* **upload-core:** fix encryption conditions ([3d1b517](https://github.com/Availity/sdk-js/commit/3d1b517607221175736c5e87cc051a04e8b88d04))
* **upload-core:** fix file path issue ([8c5d974](https://github.com/Availity/sdk-js/commit/8c5d97413ce7a0a78994cd2e3283ca9ab3ba2a6f))
* **upload-core:** fix for pending decryption status ([d05df81](https://github.com/Availity/sdk-js/commit/d05df81c8d2a072d3f7d45e372c7a8049c24c450))
* **upload-core:** fix lint ([0b2054e](https://github.com/Availity/sdk-js/commit/0b2054e7fa89cf76912d0a406914786a119ab039))
* **upload-core:** fix test case ([831e1b4](https://github.com/Availity/sdk-js/commit/831e1b4448fcefd419694e97aad01b388343b4a4))
* **upload-core:** IE compatibility no array spreads ([7444173](https://github.com/Availity/sdk-js/commit/7444173563c012711471c16605d81c1c02b73fb9))
* **upload-core:** increase timeout for scan in upload ([8dc438b](https://github.com/Availity/sdk-js/commit/8dc438b1f403de97730843a53cc9fdc2c27a341c))
* **upload-core:** leave the catch param syntax ([1b58c3d](https://github.com/Availity/sdk-js/commit/1b58c3da3b75c51265d162cb6ab77c59e52414fc))
* **upload-core:** move file type check to start ([b3dd3dd](https://github.com/Availity/sdk-js/commit/b3dd3dd4b41c7ed161530358d385320404426ca8))
* **upload-core:** package.json main file path fix ([0f5d91c](https://github.com/Availity/sdk-js/commit/0f5d91c5efa40f52d2c8c50dde26f0338928400d))
* **upload-core:** pass xhr error message to UI ([6676650](https://github.com/Availity/sdk-js/commit/6676650d54418083602597274a3f2a085442afb2))
* **upload-core:** remove redundant if check ([6d7a973](https://github.com/Availity/sdk-js/commit/6d7a9735240e13df6d205e6eb1cf9e8fafc194ad))
* **upload-core:** resolve absolute url from relative ([2efbbfb](https://github.com/Availity/sdk-js/commit/2efbbfbd14e658b576f720da5f0a3408fda797ad))
* **upload-core:** return file check error at the same time ([a5f88e8](https://github.com/Availity/sdk-js/commit/a5f88e8d6f856de483175abb0a7273266c335387))
* **upload-core:** send tus metadata mapping ([6041339](https://github.com/Availity/sdk-js/commit/604133977ee07da7e99e6b1db18475ee74ab7817))
* **upload-core:** serveral fixes ([1e0d0e4](https://github.com/Availity/sdk-js/commit/1e0d0e461c388aa3fb1f17b47a9d5cc4f5e15538))
* **upload-core:** tus attachmentName value ([fb3de99](https://github.com/Availity/sdk-js/commit/fb3de99b7b50fcfdd0a4ac883c75190722eacfb2))
* **upload-core:** update test ([65efc5a](https://github.com/Availity/sdk-js/commit/65efc5aef55c48428221fc33ea16f4ed1f17d314))
* **upload-core:** updated entry point for lib ([c4e368b](https://github.com/Availity/sdk-js/commit/c4e368b7f4ad10262630e1220951fee22b74d590))
* **upload-core:** updated entry point for lib again ([fa62902](https://github.com/Availity/sdk-js/commit/fa6290262da673576903c7f8be8230329ac0f8ee))
* **upload-core:** upload filename check ([cb98b56](https://github.com/Availity/sdk-js/commit/cb98b56d134130a4a68b214341f09485c881f697))
* **upload-core:** use full url for tus client ([3190f47](https://github.com/Availity/sdk-js/commit/3190f47f73e1b7be0b8e5923994df0a4b1a776f6)), closes [#101](https://github.com/Availity/sdk-js/issues/101)
* **upload:** replace object.values usage ([8967629](https://github.com/Availity/sdk-js/commit/8967629006317c83b009ebddb3370c965fc8ecf9))


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### Features

* adding axios resource page with exported class and methods ([12ab83d](https://github.com/Availity/sdk-js/commit/12ab83d6ca03dfa6b402fe1b1b441373a383f1bb))
* **keyv-local-sync:** init commit ([9a3d400](https://github.com/Availity/sdk-js/commit/9a3d4001ebee280cd438993949247f9243c74e1b))
* **POCL-2710:** added missing import. ([c10a8c8](https://github.com/Availity/sdk-js/commit/c10a8c89b91b60c6846223a5775401a18914dc91))
* **POCL-2710:** fixed missing this. before file. ([1c3b8de](https://github.com/Availity/sdk-js/commit/1c3b8de474c7cd8070a85dea7660530977756b53))
* **POCL-2710:** implemented logic for scanning files for corruption client-side. ([c3ba4a9](https://github.com/Availity/sdk-js/commit/c3ba4a9b975e6f477c2ff648b0e3060c627a1475))
* **upload-core:** add extra metadata field ([577c001](https://github.com/Availity/sdk-js/commit/577c00101cabd7514506004d2dd53d44bb063f47))
* **upload-core:** add file metadata via tus ([f8a4cf1](https://github.com/Availity/sdk-js/commit/f8a4cf1bff4a661a68d0e2330282e3ce125fb108)), closes [#20](https://github.com/Availity/sdk-js/issues/20)
* **upload-core:** add progress indicator for file scans ([a84cc85](https://github.com/Availity/sdk-js/commit/a84cc858573523720fc67835e8f3a584c224e9c0))
* **upload-core:** add types and run formatter ([5c530da](https://github.com/Availity/sdk-js/commit/5c530da87470dd9ab139a272099cdba8f4926012))
* **upload-core:** added changes to use usPreStart array to push functions for custom checks. ([8bc716f](https://github.com/Availity/sdk-js/commit/8bc716f093a7890f563b17bdad6d39965020af00))
* **upload-core:** added missing yarn.lock ([48bfdb7](https://github.com/Availity/sdk-js/commit/48bfdb7d91a7cf7f7ab3c39f21d15cc6c5a303ab))
* **upload-core:** adding encryption ([e08b1b2](https://github.com/Availity/sdk-js/commit/e08b1b23b28132e43794379bb46036ac273b5354))
* **upload-core:** fixed prop to this.  Added a test and fixed another test.. ([207df80](https://github.com/Availity/sdk-js/commit/207df80faff7e61a2529b53e4f306baa5c08b551))
* **upload-core:** increase file upload polling time and add config ([563c224](https://github.com/Availity/sdk-js/commit/563c224ca393c7f10da708266d73ee7ea27a02d1))
* **upload-core:** leverage existing defaultOptions ([c5e83c6](https://github.com/Availity/sdk-js/commit/c5e83c6534ab8ab3280457478f272579a75e4002))
* **upload-core:** missing upload var. ([1deb94e](https://github.com/Availity/sdk-js/commit/1deb94e8852608a3c1afb4bc4e1aefde5361b27f))
* **upload-core:** modify file figerprint to use metadata ([d45ac0c](https://github.com/Availity/sdk-js/commit/d45ac0c60e40c0e38b01a036cf5cbdde35aa63dd))
* **upload-core:** removed extra devDependency from upload-core, tiff ([fefea00](https://github.com/Availity/sdk-js/commit/fefea00170c64c44cb31f36d39640fa0752cedb0))
* **upload-core:** removed extra devDependency from upload-core, tiff ([3d20697](https://github.com/Availity/sdk-js/commit/3d20697f4639b126ffb9edf31d6d84b468848e59))
* **upload-core:** rmvl of options.onPreStart. ([2c46961](https://github.com/Availity/sdk-js/commit/2c469618144798116817e315d1ae6d82c2716c5e))
* **upload-core:** testing whether codevoc passes ([cf08634](https://github.com/Availity/sdk-js/commit/cf086346e2adfe04525adccf59efb1ab2750cd1f))
* **upload-core:** testing whether codevoc passes ([0c17562](https://github.com/Availity/sdk-js/commit/0c17562a10f500b651a28d9d0e5bf2479e7376b6))
* **upload-core:** updated upload-core to include optional parameter, onFilePreUpload, to be called before upload starts ([545c87e](https://github.com/Availity/sdk-js/commit/545c87e04015a7c26da17fed75550f461c8c59c3))
* **upload-core:** upload core file types check ([#7](https://github.com/Availity/sdk-js/issues/7)) ([080d887](https://github.com/Availity/sdk-js/commit/080d8873a13fd1a5439813497e34c1d85df56de7))
* **uploads:** capture error message ([#6](https://github.com/Availity/sdk-js/issues/6)) ([5af448e](https://github.com/Availity/sdk-js/commit/5af448eeb710897307d32cd705906207b8393fd3))


### Reverts

* Revert "chore: publish again 3.0.7" ([91c7510](https://github.com/Availity/sdk-js/commit/91c7510a8be2a0fda229ce63a98e9fd4e4345852))


### BREAKING CHANGES

* Drop Internet Explorer support
* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of
* upgrades other packages that are using old package-locks



## [5.0.3](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.2...@availity/upload-core@5.0.3) (2022-06-15)



## [5.0.2](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.1...@availity/upload-core@5.0.2) (2022-05-24)



## [5.0.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@5.0.0...@availity/upload-core@5.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [5.0.0](https://github.com/Availity/sdk-js/compare/@availity/upload-core@4.2.5...@availity/upload-core@5.0.0) (2022-04-28)


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



## [4.2.5](https://github.com/availity/sdk-js/compare/@availity/upload-core@4.2.4...@availity/upload-core@4.2.5) (2022-02-22)

**Note:** Version bump only for package @availity/upload-core





## [4.2.4](https://github.com/availity/sdk-js/compare/@availity/upload-core@4.2.3...@availity/upload-core@4.2.4) (2022-01-21)


### Bug Fixes

* **upload-core:** adds max amount of retries to av scan polling ([5175754](https://github.com/availity/sdk-js/commit/51757544e361bdad926d1ce0495e5766c56e1ba3))





## 4.2.3 (2021-12-21)

**Note:** Version bump only for package @availity/upload-core





## [4.2.2](https://github.com/Availity/sdk-js/compare/@availity/upload-core@4.2.1...@availity/upload-core@4.2.2) (2021-10-29)

**Note:** Version bump only for package @availity/upload-core





## 4.2.1 (2021-10-22)

**Note:** Version bump only for package @availity/upload-core





# 4.2.0 (2021-10-19)


### Features

* **upload-core:** add types and run formatter ([5c530da](https://github.com/Availity/sdk-js/commit/5c530da87470dd9ab139a272099cdba8f4926012))





## [4.1.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@4.1.0...@availity/upload-core@4.1.1) (2021-07-13)


### Bug Fixes

* **upload-core:** added test ([463bfce](https://github.com/Availity/sdk-js/commit/463bfce39148a8a32f94c93b7daaa8cb66350cf6))
* **upload-core:** added this to cb() method for onPreStart ([68ed9ac](https://github.com/Availity/sdk-js/commit/68ed9ac888e74cf2e4a1d68052b5db38fdaff531))





# 4.1.0 (2021-07-02)


### Bug Fixes

* **POCL-2710:** fixed build issues. ([d63daee](https://github.com/Availity/sdk-js/commit/d63daee4c112567386d0a08ebd0c1cbbf6a75a30))
* **POCL-2710:** fixed missing setError. ([2ae4e65](https://github.com/Availity/sdk-js/commit/2ae4e6570bbc7c85fb7b91f28ab6b802ccde1760))
* **POCL-2710:** fixed missing this [#2](https://github.com/Availity/sdk-js/issues/2). ([53d7846](https://github.com/Availity/sdk-js/commit/53d7846112ce76bffa8fb90df3c9015523526ca0))
* **POCL-2710:** fixed Promise [#2](https://github.com/Availity/sdk-js/issues/2). ([c3b99f6](https://github.com/Availity/sdk-js/commit/c3b99f6ab45eab15d1ab6a6d680e4017a7b132f6))
* **POCL-2710:** fixed Promise. ([e258aa0](https://github.com/Availity/sdk-js/commit/e258aa02860428d7409e6366bebdcd09384be752))


### Features

* **POCL-2710:** added missing import. ([c10a8c8](https://github.com/Availity/sdk-js/commit/c10a8c89b91b60c6846223a5775401a18914dc91))
* **POCL-2710:** fixed missing this. before file. ([1c3b8de](https://github.com/Availity/sdk-js/commit/1c3b8de474c7cd8070a85dea7660530977756b53))
* **POCL-2710:** implemented logic for scanning files for corruption client-side. ([c3ba4a9](https://github.com/Availity/sdk-js/commit/c3ba4a9b975e6f477c2ff648b0e3060c627a1475))
* **upload-core:** added changes to use usPreStart array to push functions for custom checks. ([8bc716f](https://github.com/Availity/sdk-js/commit/8bc716f093a7890f563b17bdad6d39965020af00))
* **upload-core:** added missing yarn.lock ([48bfdb7](https://github.com/Availity/sdk-js/commit/48bfdb7d91a7cf7f7ab3c39f21d15cc6c5a303ab))
* **upload-core:** fixed prop to this.  Added a test and fixed another test.. ([207df80](https://github.com/Availity/sdk-js/commit/207df80faff7e61a2529b53e4f306baa5c08b551))
* **upload-core:** missing upload var. ([1deb94e](https://github.com/Availity/sdk-js/commit/1deb94e8852608a3c1afb4bc4e1aefde5361b27f))
* **upload-core:** removed extra devDependency from upload-core, tiff ([fefea00](https://github.com/Availity/sdk-js/commit/fefea00170c64c44cb31f36d39640fa0752cedb0))
* **upload-core:** removed extra devDependency from upload-core, tiff ([3d20697](https://github.com/Availity/sdk-js/commit/3d20697f4639b126ffb9edf31d6d84b468848e59))
* **upload-core:** rmvl of options.onPreStart. ([2c46961](https://github.com/Availity/sdk-js/commit/2c469618144798116817e315d1ae6d82c2716c5e))
* **upload-core:** testing whether codevoc passes ([cf08634](https://github.com/Availity/sdk-js/commit/cf086346e2adfe04525adccf59efb1ab2750cd1f))
* **upload-core:** testing whether codevoc passes ([0c17562](https://github.com/Availity/sdk-js/commit/0c17562a10f500b651a28d9d0e5bf2479e7376b6))
* **upload-core:** updated upload-core to include optional parameter, onFilePreUpload, to be called before upload starts ([545c87e](https://github.com/Availity/sdk-js/commit/545c87e04015a7c26da17fed75550f461c8c59c3))





# 4.0.0 (2021-05-17)


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))


### BREAKING CHANGES

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of





## 3.2.7 (2020-06-22)

**Note:** Version bump only for package @availity/upload-core





## 3.2.6 (2020-05-01)

**Note:** Version bump only for package @availity/upload-core





## 3.2.5 (2020-04-30)

**Note:** Version bump only for package @availity/upload-core





## 3.2.4 (2020-04-22)

**Note:** Version bump only for package @availity/upload-core





## 3.2.3 (2020-04-08)

**Note:** Version bump only for package @availity/upload-core





## 3.2.2 (2020-04-06)

**Note:** Version bump only for package @availity/upload-core





## 3.2.1 (2020-04-06)

**Note:** Version bump only for package @availity/upload-core





# [3.2.0](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.10...@availity/upload-core@3.2.0) (2020-02-17)


### Features

* adding axios resource page with exported class and methods ([12ab83d](https://github.com/Availity/sdk-js/commit/12ab83d6ca03dfa6b402fe1b1b441373a383f1bb))





## [3.1.10](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.7...@availity/upload-core@3.1.10) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.9](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.8...@availity/upload-core@3.1.9) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.8](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.6...@availity/upload-core@3.1.8) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.7](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.5...@availity/upload-core@3.1.7) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.6](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.5...@availity/upload-core@3.1.6) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.5](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.2...@availity/upload-core@3.1.5) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.4](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.3...@availity/upload-core@3.1.4) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.3](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.2...@availity/upload-core@3.1.3) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.2](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.1...@availity/upload-core@3.1.2) (2020-02-13)

**Note:** Version bump only for package @availity/upload-core





## [3.1.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.1.0...@availity/upload-core@3.1.1) (2020-02-12)

**Note:** Version bump only for package @availity/upload-core





# [3.1.0](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.14...@availity/upload-core@3.1.0) (2020-02-05)


### Features

* **upload-core:** increase file upload polling time and add config ([563c224](https://github.com/Availity/sdk-js/commit/563c224))
* **upload-core:** leverage existing defaultOptions ([c5e83c6](https://github.com/Availity/sdk-js/commit/c5e83c6))





## [3.0.14](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.13...@availity/upload-core@3.0.14) (2020-01-23)

**Note:** Version bump only for package @availity/upload-core





## [3.0.13](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.12...@availity/upload-core@3.0.13) (2020-01-07)

### Bug Fixes

-   **upload-core:** updated entry point for lib ([c4e368b](https://github.com/Availity/sdk-js/commit/c4e368b))
-   **upload-core:** updated entry point for lib again ([fa62902](https://github.com/Availity/sdk-js/commit/fa62902))

## [3.0.12](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.11...@availity/upload-core@3.0.12) (2020-01-03)

**Note:** Version bump only for package @availity/upload-core

## [3.0.11](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.10...@availity/upload-core@3.0.11) (2020-01-03)

**Note:** Version bump only for package @availity/upload-core

## [3.0.10](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.9...@availity/upload-core@3.0.10) (2019-10-21)

**Note:** Version bump only for package @availity/upload-core

## [3.0.9](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.8...@availity/upload-core@3.0.9) (2019-09-27)

**Note:** Version bump only for package @availity/upload-core

## [3.0.8](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.6...@availity/upload-core@3.0.8) (2019-07-30)

**Note:** Version bump only for package @availity/upload-core

## [3.0.6](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.5...@availity/upload-core@3.0.6) (2019-07-30)

### Bug Fixes

-   **upload-core:** change error name for lint ([1d3ae92](https://github.com/Availity/sdk-js/commit/1d3ae92))
-   **upload-core:** leave the catch param syntax ([1b58c3d](https://github.com/Availity/sdk-js/commit/1b58c3d))

## [3.0.5](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.4...@availity/upload-core@3.0.5) (2019-06-26)

### Bug Fixes

-   **upload-core:** increase timeout for scan in upload ([8dc438b](https://github.com/Availity/sdk-js/commit/8dc438b))

## [3.0.4](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.3...@availity/upload-core@3.0.4) (2019-04-29)

**Note:** Version bump only for package @availity/upload-core

## [3.0.3](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.2...@availity/upload-core@3.0.3) (2019-04-26)

**Note:** Version bump only for package @availity/upload-core

## [3.0.2](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.1...@availity/upload-core@3.0.2) (2019-04-25)

**Note:** Version bump only for package @availity/upload-core

## [3.0.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@3.0.0...@availity/upload-core@3.0.1) (2019-04-25)

**Note:** Version bump only for package @availity/upload-core

# [3.0.0](https://github.com/Availity/sdk-js/compare/@availity/upload-core@2.7.1...@availity/upload-core@3.0.0) (2019-04-23)

### Bug Fixes

-   **upload-core:** resolve absolute url from relative ([2efbbfb](https://github.com/Availity/sdk-js/commit/2efbbfb))
-   **upload-core:** use full url for tus client ([3190f47](https://github.com/Availity/sdk-js/commit/3190f47)), closes [#101](https://github.com/Availity/sdk-js/issues/101)

### BREAKING CHANGES

-   There should be no breaking changes in this version. `v3.0.0` was accidently published by our build process.

## [2.7.1](https://github.com/Availity/sdk-js/compare/@availity/upload-core@2.7.0...@availity/upload-core@2.7.1) (2019-02-12)

**Note:** Version bump only for package @availity/upload-core

# 2.7.0 (2019-02-12)

### Bug Fixes

-   **upload-core:** auto retry failed uploads ([#73](https://github.com/Availity/sdk-js/issues/73)) ([c602275](https://github.com/Availity/sdk-js/commit/c602275)), closes [#71](https://github.com/Availity/sdk-js/issues/71)

# 2.5.0 (2018-08-20)

# 2.4.0 (2018-07-12)

### Bug Fixes

-   **upload-core:** IE compatibility no array spreads ([7444173](https://github.com/Availity/sdk-js/commit/7444173))

# 2.2.0 (2018-06-29)

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **upload-core:** upload filename check ([cb98b56](https://github.com/Availity/sdk-js/commit/cb98b56))

## 2.0.5 (2018-05-18)

### Bug Fixes

-   **upload-core:** package.json main file path fix ([0f5d91c](https://github.com/Availity/sdk-js/commit/0f5d91c))

## 2.0.4 (2018-05-17)

### Bug Fixes

-   **upload-core:** change message when file is decrypting ([416a654](https://github.com/Availity/sdk-js/commit/416a654))

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **upload-core:** fix file path issue ([8c5d974](https://github.com/Availity/sdk-js/commit/8c5d974))

## 1.6.3 (2018-04-24)

### Bug Fixes

-   **upload-core:** check xhr error message from header ([1609d58](https://github.com/Availity/sdk-js/commit/1609d58))
-   **upload-core:** update test ([65efc5a](https://github.com/Availity/sdk-js/commit/65efc5a))

## 1.6.1 (2018-04-23)

### Bug Fixes

-   **upload-core:** pass xhr error message to UI ([6676650](https://github.com/Availity/sdk-js/commit/6676650))

## 1.5.1 (2018-04-18)

### Bug Fixes

-   **upload-core:** fix for pending decryption status ([d05df81](https://github.com/Availity/sdk-js/commit/d05df81))

# 1.5.0 (2018-04-18)

## 1.4.1 (2018-04-18)

### Bug Fixes

-   **upload:** replace object.values usage ([8967629](https://github.com/Availity/sdk-js/commit/8967629))

# 1.4.0 (2018-04-17)

### Bug Fixes

-   **upload-core:** fix encryption conditions ([3d1b517](https://github.com/Availity/sdk-js/commit/3d1b517))

### Features

-   **upload-core:** adding encryption ([e08b1b2](https://github.com/Availity/sdk-js/commit/e08b1b2))
-   **upload-core:** modify file figerprint to use metadata ([d45ac0c](https://github.com/Availity/sdk-js/commit/d45ac0c))

## 1.1.4 (2018-04-10)

### Bug Fixes

-   **upload-core:** remove redundant if check ([6d7a973](https://github.com/Availity/sdk-js/commit/6d7a973))

### Features

-   **upload-core:** add extra metadata field ([577c001](https://github.com/Availity/sdk-js/commit/577c001))

## 1.1.3 (2018-04-04)

### Bug Fixes

-   **upload-core:** add test cases ([86409f8](https://github.com/Availity/sdk-js/commit/86409f8))
-   **upload-core:** fix lint ([0b2054e](https://github.com/Availity/sdk-js/commit/0b2054e))
-   **upload-core:** return file check error at the same time ([a5f88e8](https://github.com/Availity/sdk-js/commit/a5f88e8))
-   **upload-core:** send tus metadata mapping ([6041339](https://github.com/Availity/sdk-js/commit/6041339))
-   **upload-core:** tus attachmentName value ([fb3de99](https://github.com/Availity/sdk-js/commit/fb3de99))

### Features

-   **upload-core:** add file metadata via tus ([f8a4cf1](https://github.com/Availity/sdk-js/commit/f8a4cf1)), closes [#20](https://github.com/Availity/sdk-js/issues/20)

## 1.1.1 (2018-03-28)

## 1.0.2 (2018-03-27)

### Bug Fixes

-   **upload-core:** add max file size ([447dd00](https://github.com/Availity/sdk-js/commit/447dd00))

### Features

-   **keyv-local-sync:** init commit ([9a3d400](https://github.com/Availity/sdk-js/commit/9a3d400))

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **upload-core:** error handling ([14fa7ba](https://github.com/Availity/sdk-js/commit/14fa7ba))
-   **upload-core:** fix test case ([831e1b4](https://github.com/Availity/sdk-js/commit/831e1b4))
-   **upload-core:** move file type check to start ([b3dd3dd](https://github.com/Availity/sdk-js/commit/b3dd3dd))

### Features

-   **upload-core:** upload core file types check ([#7](https://github.com/Availity/sdk-js/issues/7)) ([080d887](https://github.com/Availity/sdk-js/commit/080d887))
-   **uploads:** capture error message ([#6](https://github.com/Availity/sdk-js/issues/6)) ([5af448e](https://github.com/Availity/sdk-js/commit/5af448e))

# 1.0.0-alpha.17 (2018-01-18)

### Bug Fixes

-   **upload-core:** serveral fixes ([1e0d0e4](https://github.com/Availity/sdk-js/commit/1e0d0e4))

# 1.0.0-alpha.16 (2018-01-17)

### Features

-   **upload-core:** add progress indicator for file scans ([a84cc85](https://github.com/Availity/sdk-js/commit/a84cc85))

# 1.0.0-alpha.15 (2018-01-12)

### Bug Fixes

-   **upload-core:** add additional headers ([9a10f16](https://github.com/Availity/sdk-js/commit/9a10f16))

# 1.0.0-alpha.14 (2018-01-11)

# 1.0.0-alpha.13 (2018-01-10)

# 1.0.0-alpha.12 (2018-01-09)

# 1.0.0-alpha.11 (2018-01-06)

<a name="2.6.0"></a>

# 2.6.0 (2018-11-20)

### Bug Fixes

-   **upload-core:** auto retry failed uploads ([#73](https://github.com/Availity/sdk-js/issues/73)) ([c602275](https://github.com/Availity/sdk-js/commit/c602275)), closes [#71](https://github.com/Availity/sdk-js/issues/71)

<a name="2.5.0"></a>

# 2.5.0 (2018-08-20)

<a name="2.4.0"></a>

# 2.4.0 (2018-07-12)

### Bug Fixes

-   **upload-core:** IE compatibility no array spreads ([7444173](https://github.com/Availity/sdk-js/commit/7444173))

<a name="2.3.3"></a>

## 2.3.3 (2018-07-12)

<a name="2.2.0"></a>

# 2.2.0 (2018-06-29)

<a name="2.1.2"></a>

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **upload-core:** upload filename check ([cb98b56](https://github.com/Availity/sdk-js/commit/cb98b56))

<a name="2.0.5"></a>

## 2.0.5 (2018-05-18)

### Bug Fixes

-   **upload-core:** package.json main file path fix ([0f5d91c](https://github.com/Availity/sdk-js/commit/0f5d91c))

<a name="2.0.4"></a>

## 2.0.4 (2018-05-17)

### Bug Fixes

-   **upload-core:** change message when file is decrypting ([416a654](https://github.com/Availity/sdk-js/commit/416a654))

<a name="2.0.3"></a>

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **upload-core:** fix file path issue ([8c5d974](https://github.com/Availity/sdk-js/commit/8c5d974))

<a name="1.6.3"></a>

## 1.6.3 (2018-04-24)

### Bug Fixes

-   **upload-core:** check xhr error message from header ([1609d58](https://github.com/Availity/sdk-js/commit/1609d58))
-   **upload-core:** update test ([65efc5a](https://github.com/Availity/sdk-js/commit/65efc5a))

<a name="1.6.1"></a>

## 1.6.1 (2018-04-23)

### Bug Fixes

-   **upload-core:** pass xhr error message to UI ([6676650](https://github.com/Availity/sdk-js/commit/6676650))

<a name="1.5.1"></a>

## 1.5.1 (2018-04-18)

### Bug Fixes

-   **upload-core:** fix for pending decryption status ([d05df81](https://github.com/Availity/sdk-js/commit/d05df81))

<a name="1.5.0"></a>

# 1.5.0 (2018-04-18)

<a name="1.4.1"></a>

## 1.4.1 (2018-04-18)

### Bug Fixes

-   **upload:** replace object.values usage ([8967629](https://github.com/Availity/sdk-js/commit/8967629))

<a name="1.4.0"></a>

# 1.4.0 (2018-04-17)

### Bug Fixes

-   **upload-core:** fix encryption conditions ([3d1b517](https://github.com/Availity/sdk-js/commit/3d1b517))

### Features

-   **upload-core:** adding encryption ([e08b1b2](https://github.com/Availity/sdk-js/commit/e08b1b2))
-   **upload-core:** modify file figerprint to use metadata ([d45ac0c](https://github.com/Availity/sdk-js/commit/d45ac0c))

<a name="1.1.4"></a>

## 1.1.4 (2018-04-10)

### Bug Fixes

-   **upload-core:** remove redundant if check ([6d7a973](https://github.com/Availity/sdk-js/commit/6d7a973))

### Features

-   **upload-core:** add extra metadata field ([577c001](https://github.com/Availity/sdk-js/commit/577c001))

<a name="1.1.3"></a>

## 1.1.3 (2018-04-04)

### Bug Fixes

-   **upload-core:** add test cases ([86409f8](https://github.com/Availity/sdk-js/commit/86409f8))
-   **upload-core:** fix lint ([0b2054e](https://github.com/Availity/sdk-js/commit/0b2054e))
-   **upload-core:** return file check error at the same time ([a5f88e8](https://github.com/Availity/sdk-js/commit/a5f88e8))
-   **upload-core:** send tus metadata mapping ([6041339](https://github.com/Availity/sdk-js/commit/6041339))
-   **upload-core:** tus attachmentName value ([fb3de99](https://github.com/Availity/sdk-js/commit/fb3de99))

### Features

-   **upload-core:** add file metadata via tus ([f8a4cf1](https://github.com/Availity/sdk-js/commit/f8a4cf1)), closes [#20](https://github.com/Availity/sdk-js/issues/20)

<a name="1.1.1"></a>

## 1.1.1 (2018-03-28)

<a name="1.0.2"></a>

## 1.0.2 (2018-03-27)

### Bug Fixes

-   **upload-core:** add max file size ([447dd00](https://github.com/Availity/sdk-js/commit/447dd00))

### Features

-   **keyv-local-sync:** init commit ([9a3d400](https://github.com/Availity/sdk-js/commit/9a3d400))

<a name="1.0.1"></a>

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **upload-core:** error handling ([14fa7ba](https://github.com/Availity/sdk-js/commit/14fa7ba))
-   **upload-core:** fix test case ([831e1b4](https://github.com/Availity/sdk-js/commit/831e1b4))
-   **upload-core:** move file type check to start ([b3dd3dd](https://github.com/Availity/sdk-js/commit/b3dd3dd))

### Features

-   **upload-core:** upload core file types check ([#7](https://github.com/Availity/sdk-js/issues/7)) ([080d887](https://github.com/Availity/sdk-js/commit/080d887))
-   **uploads:** capture error message ([#6](https://github.com/Availity/sdk-js/issues/6)) ([5af448e](https://github.com/Availity/sdk-js/commit/5af448e))

<a name="1.0.0-alpha.17"></a>

# 1.0.0-alpha.17 (2018-01-18)

### Bug Fixes

-   **upload-core:** serveral fixes ([1e0d0e4](https://github.com/Availity/sdk-js/commit/1e0d0e4))

<a name="1.0.0-alpha.16"></a>

# 1.0.0-alpha.16 (2018-01-17)

### Features

-   **upload-core:** add progress indicator for file scans ([a84cc85](https://github.com/Availity/sdk-js/commit/a84cc85))

<a name="1.0.0-alpha.15"></a>

# 1.0.0-alpha.15 (2018-01-12)

### Bug Fixes

-   **upload-core:** add additional headers ([9a10f16](https://github.com/Availity/sdk-js/commit/9a10f16))

<a name="1.0.0-alpha.14"></a>

# 1.0.0-alpha.14 (2018-01-11)

<a name="1.0.0-alpha.13"></a>

# 1.0.0-alpha.13 (2018-01-10)

<a name="1.0.0-alpha.12"></a>

# 1.0.0-alpha.12 (2018-01-09)

<a name="1.0.0-alpha.11"></a>

# 1.0.0-alpha.11 (2018-01-06)
