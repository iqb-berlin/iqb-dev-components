[![npm](https://img.shields.io/npm/v/iqb-dev-components.svg?style=flat-square)](https://www.npmjs.com/package/iqb-dev-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/iqb-berlin/iqb-dev-components?style=flat-square)

# IQB Dev Components

This is a library of components for developing WebApp Projects of the IQB.

## Components

### DistPacker

The DistPacker can be used as a command line tool and needs no installation, other than NodeJS or any other Javascript Execution Engine.

#### Usage
```
node distpacker.js <target-dir> <target-filename>
```

When used as a depency of a npm project, you can use the path to the node_modules folder.

```
node node_modules/iqb-dev-components/src/distpacker.js dist/%npm_package_name
```

### Message Recorder

This is an EventListener on the *window* object on web pages. It records all messages, which can be retrieved wholesome or by type.

#### Installation

```
npm install --save-dev iqb-dev-components
```

#### Usage

Most importantyl it needs a reference to your Selenium webdriver as a parameter. When using *protractor* you can simply pass the *briwser* object. For plain Javascript it needs to be built manually.

```
// import
const MessageRecorder = require('iqb-dev-components').MessageRecorder;
// in Typescript you may also use:
// import { MessageRecorder } from 'iqb-dev-components';

// start recording
MessageRecorder.recordMessages(driver);

// retrieve all messageof type (type can be omitted for any type)
MessageRecorder.getLastMessage(driver, 'type');
```
