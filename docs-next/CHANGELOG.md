# @keystone-next/website

## 1.3.0

### Minor Changes

- [#5368](https://github.com/keystonejs/keystone/pull/5368) [`b40016301`](https://github.com/keystonejs/keystone/commit/b40016301dab71630068cc86c04828c5ee1683e8) Thanks [@timleslie](https://github.com/timleslie)! - The config option `db.adapter` is now deprecated. It has been repaced with `db.provider` which can take the values `postgresql` or `sqlite`.

### Patch Changes

- [#5301](https://github.com/keystonejs/keystone/pull/5301) [`c8744fd56`](https://github.com/keystonejs/keystone/commit/c8744fd56d03ccbf9fefb75edf94c147b636555a) Thanks [@raveling](https://github.com/raveling)! - Added a Keystone 5 vs Next guide to site.

* [#5340](https://github.com/keystonejs/keystone/pull/5340) [`ff472d5af`](https://github.com/keystonejs/keystone/commit/ff472d5afeffb5f38b76004fcda02f81338d8eb8) Thanks [@raveling](https://github.com/raveling)! - copy changes to home page (including CTA to getting started tut)

- [#5283](https://github.com/keystonejs/keystone/pull/5283) [`192393d0d`](https://github.com/keystonejs/keystone/commit/192393d0df67e123a694a42dd3f95ffa6d40042b) Thanks [@timleslie](https://github.com/timleslie)! - The flag `{ experimental: { prismaSqlite: true } }` is no longer required to use the SQLite adapter.

- Updated dependencies [[`4fa66ac1f`](https://github.com/keystonejs/keystone/commit/4fa66ac1fc6fd0a43da17dd90797733e8c958785), [`d93bab17b`](https://github.com/keystonejs/keystone/commit/d93bab17b69c76e57580dc00e41314215da6d49b)]:
  - @keystone-next/fields-document@4.0.0
  - @keystone-ui/fields@2.1.0

## 1.2.0

### Minor Changes

- [#3946](https://github.com/keystonejs/keystone/pull/3946) [`8e9b04ecd`](https://github.com/keystonejs/keystone/commit/8e9b04ecd07d9c5d0e6aead4705e7a655498ae05) Thanks [@timleslie](https://github.com/timleslie)! - Added experimental support for Prisma + SQLite as a database adapter.

* [#4912](https://github.com/keystonejs/keystone/pull/4912) [`d31acf61b`](https://github.com/keystonejs/keystone/commit/d31acf61bcca96ac059d4ba2e78955513a6a0f91) Thanks [@timleslie](https://github.com/timleslie)! - Added a `config.graphql.apolloConfig` option to allow developers to configure the `ApolloServer` object provided by Keystone.

### Patch Changes

- [#5150](https://github.com/keystonejs/keystone/pull/5150) [`3a9d20ce1`](https://github.com/keystonejs/keystone/commit/3a9d20ce11463e7f73f6b6325375cdcee17d63ed) Thanks [@timleslie](https://github.com/timleslie)! - Applied eslint `import/order` rule.

- Updated dependencies [[`8e9b04ecd`](https://github.com/keystonejs/keystone/commit/8e9b04ecd07d9c5d0e6aead4705e7a655498ae05), [`17c86e0c3`](https://github.com/keystonejs/keystone/commit/17c86e0c3eda7ba08d1bb8edf5eb8ddc9a819e5a), [`3a9d20ce1`](https://github.com/keystonejs/keystone/commit/3a9d20ce11463e7f73f6b6325375cdcee17d63ed), [`a4e34e9eb`](https://github.com/keystonejs/keystone/commit/a4e34e9ebb6f746f54ccd898d0aeb4dc5c5d9271)]:
  - @keystone-next/fields-document@3.1.0
  - @keystone-ui/fields@2.0.2
  - @keystone-ui/core@2.0.2
  - @keystone-ui/notice@2.0.2

## 1.1.1

### Patch Changes

- [#5073](https://github.com/keystonejs/keystone/pull/5073) [`ba637676b`](https://github.com/keystonejs/keystone/commit/ba637676b83625b06581daae6fd625d8fb0b612d) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Moved viewport meta tag from \_document to \_app to avoid dedupe issues and next warnings.

* [#5072](https://github.com/keystonejs/keystone/pull/5072) [`5a78af92e`](https://github.com/keystonejs/keystone/commit/5a78af92e1ab364f9ab444c5244f9581e33bad1f) Thanks [@timleslie](https://github.com/timleslie)! - Updated cypress tests to pre-build the site before running the tests.

## 1.1.0

### Minor Changes

- [`b1da7806c`](https://github.com/keystonejs/keystone/commit/b1da7806c0e82f676de5bc51595069be71b86331) [#4922](https://github.com/keystonejs/keystone/pull/4922) Thanks [@timleslie](https://github.com/timleslie)! - Added access control API docs.

* [`f4163a06d`](https://github.com/keystonejs/keystone/commit/f4163a06d27fcb106a0159711010e0087eebc945) [#4838](https://github.com/keystonejs/keystone/pull/4838) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Added anchoring and copy to clipboard functionality to headings

### Patch Changes

- [`f4e4498c6`](https://github.com/keystonejs/keystone/commit/f4e4498c6e4c7301288f23048f4aad3c492985c7) [#5018](https://github.com/keystonejs/keystone/pull/5018) Thanks [@bladey](https://github.com/bladey)! - Updated legacy packages to the @keystone-next namespace.

* [`2655c0b1b`](https://github.com/keystonejs/keystone/commit/2655c0b1bf714d80d46e1ff4e414b4bce474c23d) [#4866](https://github.com/keystonejs/keystone/pull/4866) Thanks [@timleslie](https://github.com/timleslie)! - Added a `config.ui.isDisabled` option to completely disable the Admin UI.

- [`f4163a06d`](https://github.com/keystonejs/keystone/commit/f4163a06d27fcb106a0159711010e0087eebc945) [#4838](https://github.com/keystonejs/keystone/pull/4838) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Remove backticks from headings in docs

* [`45d2b7cc9`](https://github.com/keystonejs/keystone/commit/45d2b7cc9b56a73c68f424cffc5cf143dfc9caa9) [#4925](https://github.com/keystonejs/keystone/pull/4925) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Removed backticks from inline code blocks in mdx, and made minor styling changes.

- [`1f315bbfb`](https://github.com/keystonejs/keystone/commit/1f315bbfb750d9570d7969aa0c9349e6a7d427e4) [#4961](https://github.com/keystonejs/keystone/pull/4961) Thanks [@timleslie](https://github.com/timleslie)! - Added docs for the `float` field type.

* [`954083571`](https://github.com/keystonejs/keystone/commit/954083571d8ca8c3b37deb8332f911c4cc755f89) [#4926](https://github.com/keystonejs/keystone/pull/4926) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Added a favicon to @keystone-next/website

* Updated dependencies [[`f4e4498c6`](https://github.com/keystonejs/keystone/commit/f4e4498c6e4c7301288f23048f4aad3c492985c7), [`556c1f95f`](https://github.com/keystonejs/keystone/commit/556c1f95f287035493704d6f5d9744fd5e9774b6), [`556c1f95f`](https://github.com/keystonejs/keystone/commit/556c1f95f287035493704d6f5d9744fd5e9774b6), [`556c1f95f`](https://github.com/keystonejs/keystone/commit/556c1f95f287035493704d6f5d9744fd5e9774b6), [`556c1f95f`](https://github.com/keystonejs/keystone/commit/556c1f95f287035493704d6f5d9744fd5e9774b6), [`3ca5038a0`](https://github.com/keystonejs/keystone/commit/3ca5038a021105a7452f4e7a4641107caa4ffe3a), [`d53eb872f`](https://github.com/keystonejs/keystone/commit/d53eb872ffb0396fcdcae34c380acf9739c8ca5d)]:
  - @keystone-ui/button@3.0.1
  - @keystone-ui/core@2.0.1
  - @keystone-ui/fields@2.0.1
  - @keystone-ui/icons@2.0.1
  - @keystone-ui/notice@2.0.1
  - @keystone-ui/toast@2.0.1
  - @keystone-ui/tooltip@2.0.1
  - @keystone-next/fields-document@3.0.0

## 1.0.0

### Major Changes

- [`b97216a65`](https://github.com/keystonejs/keystone/commit/b97216a6526fffcca8232d86b115c28cb19587bf) [#4622](https://github.com/keystonejs/keystone/pull/4622) Thanks [@renovate](https://github.com/apps/renovate)! - Updated react and react-dom to v17

### Patch Changes

- [`28c2ee5be`](https://github.com/keystonejs/keystone/commit/28c2ee5bee5866c90c6f114e9120f57434f552fe) [#4811](https://github.com/keystonejs/keystone/pull/4811) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Added syntax highlighting to code in mdx.

- Updated dependencies [[`b97216a65`](https://github.com/keystonejs/keystone/commit/b97216a6526fffcca8232d86b115c28cb19587bf)]:
  - @keystone-ui/button@3.0.0
  - @keystone-ui/core@2.0.0
  - @keystone-ui/fields@2.0.0
  - @keystone-ui/notice@2.0.0
  - @keystone-ui/tooltip@2.0.0

## 0.1.1

### Patch Changes

- [`75d3c521e`](https://github.com/keystonejs/keystone/commit/75d3c521e4f1f0a1eec9bc91319839a2afc000e0) [#4770](https://github.com/keystonejs/keystone/pull/4770) Thanks [@timleslie](https://github.com/timleslie)! - Upgraded Next.js dependency to `10.0.5`.

## 0.1.0

### Minor Changes

- [`26543bd07`](https://github.com/keystonejs/keystone/commit/26543bd0752c470e336d61644c14e6a5333f65c0) [#4758](https://github.com/keystonejs/keystone/pull/4758) Thanks [@timleslie](https://github.com/timleslie)! - Added documentation for the `keystone-next` CLI.

### Patch Changes

- [`08a67e820`](https://github.com/keystonejs/keystone/commit/08a67e820ff3f8ce22ba3fb57d1730202b18fddf) [#4764](https://github.com/keystonejs/keystone/pull/4764) Thanks [@timleslie](https://github.com/timleslie)! - Moved API docs into a separate section from the Guides.

- [`4c635ae4b`](https://github.com/keystonejs/keystone/commit/4c635ae4bb5a4c4b5525103b55b145db7a443a63) [#4737](https://github.com/keystonejs/keystone/pull/4737) Thanks [@timleslie](https://github.com/timleslie)! - Added API placeholder.
