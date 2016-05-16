'use strict'

var assert = require('assert-ok')
var codes = require('builtin-status-codes')
var isError = require('is-error-code')

module.exports = function httpStatusError (code) {
  assert(typeof code === 'number', 'expected http status number')
  return !isError(code) ? null : createError(code)
}

function createError (code) {
  var err = new Error(codes[code] + ' (' + code + ')')
  err.statusCode = code
  return err
}
