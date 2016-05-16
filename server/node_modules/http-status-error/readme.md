# http-status-error [![Build Status](https://travis-ci.org/bendrucker/http-status-error.svg?branch=master)](https://travis-ci.org/bendrucker/http-status-error)

> Create errors using an HTTP status


## Install

```
$ npm install --save http-status-error
```


## Usage

```js
var httpStatusError = require('http-status-error')

httpStatusError(200)
//=> null

httpStatusError(404)
//=> err.message => "Not Found (404)"
//=> err.statusCode => 404
```

## API

#### `httpStatusError(code)` -> `null` / `error`

##### input

*Required*  
Type: `number`

An HTTP status code.


## License

MIT © [Ben Drucker](http://bendrucker.me)
