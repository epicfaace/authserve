authserve
=========

Serve static files with authentication.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/authserve.svg)](https://npmjs.org/package/authserve)
[![Downloads/week](https://img.shields.io/npm/dw/authserve.svg)](https://npmjs.org/package/authserve)
[![License](https://img.shields.io/npm/l/authserve.svg)](https://github.com/epicfaace/authserve/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)


# Introduction

Add seamless authentication to your static site.

Authserve currently supports serving a static site through Express with GitHub authentication, but more providers could be added in the future!

# Installation

```sh
npm install -g authserve
```

# Usage

First, create a `authserve.config.js` file and populate it with the right parameters.

By default, static files are served from the `site` directory. This means that you should run your build step (such as `mkdocs build`) before running `authserve`.

Then run:

```sh
authserve
```

# Config

To start, you must first create an `authserve.config.js` file in your current working directory. Here is an example file:

```js
module.exports = {
  serve: {
    type: "express",
    sessionSecret: process.env.SESSION_SECRET
  },
  auth: {
    type: "github",
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    allowedUsernames: []
  }
}
```

## Serve

The `serve` property determines how the authenticated static site is served.

The `type` property determines what software is used to serve the site. For now, the only type supported is "express", which uses Express.

### Supported parameters

Name | Description | Example
---------- | ----------- | --------
`clientID` | Random secret used by Express in order to initialize and save server-side sessions. We recommend using something like the [secrets](https://docs.python.org/3/library/secrets.html) module to generate this value. | `"89f4f55340c5553037a070"`

### Sample configuration

```js
module.exports = {
  serve: {
    type: "express",
    sessionSecret: process.env.SESSION_SECRET
  }
};
```

## Auth

The `auth` property determines how the authenticated static site is served.

The `type` property determines what type of authentication is used to serve the site. For now, the only type supported is "github", which uses [GitHub OAuth](https://docs.github.com/en/developers/apps/authorizing-oauth-apps).

To set up GitHub authentication, follow the steps in [Creating an OAuth App](https://docs.github.com/en/developers/apps/creating-an-oauth-app) to create an OAuth app.

### Supported parameters

Name | Description | Example
---------- | ----------- | --------
`clientID` | GitHub OAuth App client ID | `"a59e8726d5396ed36d83"`
`clientSecret` | GitHub OAuth App client secret | `"318df8a1e649d778a2a694216bcad2d57344a120"`
`callbackURL` | GitHub OAuth App callback URL. Equal to `[your app url]/login/github/callback`. Additionally, this value should match the value set in "Authorization callback URL" in the GitHub OAuth App settings page. | `"https://localhost:8080/login/github/callback"`
`allowedUsernames` | List of GitHub usernames with access to your website. | `["epicfaace"]`

### Sample configuration

```js
module.exports = {
  serve: {
    type: "github",
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    allowedUsernames: []
  }
};
```