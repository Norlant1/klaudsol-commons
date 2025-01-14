"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sha256 = exports.sanitizeData = exports.fromInsertAurora = exports.fromDeleteAurora = exports.fromAurora = exports.fieldsForUpdate = exports.fieldsForSelect = exports.fieldsForInsert = exports.fieldParametersForInsert = exports.executeStatementParamsForUpdate = exports.executeStatementParamsForInsert = exports["default"] = exports.AURORA_TYPE = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _es6Promisify = require("es6-promisify");
var _GlobalConstants = _interopRequireDefault(require("../lib/GlobalConstants"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AURORA_AWS_ACCESS_KEY_ID = process.env.AURORA_AWS_ACCESS_KEY_ID;
var AURORA_AWS_SECRET_ACCESS_KEY = process.env.AURORA_AWS_SECRET_ACCESS_KEY;
var AURORA_RESOURCE_ARN = process.env.AURORA_RESOURCE_ARN;
var AURORA_SECRET_ARN = process.env.AURORA_SECRET_ARN;
var AURORA_DATABASE = process.env.AURORA_DATABASE;
var AURORA_AWS_REGION = _GlobalConstants["default"].AURORA_AWS_REGION,
  BACKEND_PORT = _GlobalConstants["default"].BACKEND_PORT,
  FRONTEND_PORT = _GlobalConstants["default"].FRONTEND_PORT;
var DB = /*#__PURE__*/function () {
  function DB() {
    _classCallCheck(this, DB);
    var rdsConfig = {
      region: AURORA_AWS_REGION,
      credentials: new _awsSdk["default"].Credentials({
        accessKeyId: AURORA_AWS_ACCESS_KEY_ID,
        secretAccessKey: AURORA_AWS_SECRET_ACCESS_KEY
      })
    };
    var RDS = new _awsSdk["default"].RDSDataService(rdsConfig);
    var statementConfig = {
      resourceArn: AURORA_RESOURCE_ARN,
      secretArn: AURORA_SECRET_ARN,
      database: AURORA_DATABASE
    };
    this.executeStatement = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sql) {
        var parameters,
          exec,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              parameters = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
              exec = (0, _es6Promisify.promisify)(RDS.executeStatement.bind(RDS));
              _context.next = 4;
              return exec(_objectSpread(_objectSpread({}, statementConfig), {}, {
                sql: sql,
                parameters: parameters
              }));
            case 4:
              return _context.abrupt("return", _context.sent);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.batchExecuteStatement = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sql) {
        var parameterSets,
          exec,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              parameterSets = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
              exec = (0, _es6Promisify.promisify)(RDS.batchExecuteStatement.bind(RDS));
              _context2.next = 4;
              return exec(_objectSpread(_objectSpread({}, statementConfig), {}, {
                sql: sql,
                parameterSets: parameterSets
              }));
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  }

  //OMG the typo has been here the whole time!
  _createClass(DB, [{
    key: "exectuteStatement",
    value: function () {
      var _exectuteStatement = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sql) {
        var parameters,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              parameters = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];
              console.error("Migrate to exectuteStatement to executeStatement ASAP!");
              return _context3.abrupt("return", this.executeStatement(sql, parameters));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function exectuteStatement(_x3) {
        return _exectuteStatement.apply(this, arguments);
      }
      return exectuteStatement;
    }()
  }]);
  return DB;
}();
var _default = DB;
exports["default"] = _default;
var sha256 = function sha256(text) {
  return _crypto["default"].createHash('sha256').update(text).digest('base64');
};
exports.sha256 = sha256;
var fieldsForSelect = function fieldsForSelect(table, fieldsHash) {
  return Object.entries(fieldsHash).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
      name = _ref4[0];
    return "".concat(table, ".").concat(name);
  }).join(',');
};
exports.fieldsForSelect = fieldsForSelect;
var allowedFieldsOnCreate = function allowedFieldsOnCreate(fieldsHash) {
  return Object.entries(fieldsHash).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      name = _ref6[0],
      allowOnCreate = _ref6[1].allowOnCreate;
    return allowOnCreate;
  });
};
var fieldsForInsert = function fieldsForInsert(fieldsHash) {
  return allowedFieldsOnCreate(fieldsHash).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
      name = _ref8[0];
    return "".concat(name);
  }).join(',');
};
exports.fieldsForInsert = fieldsForInsert;
var fieldParametersForInsert = function fieldParametersForInsert(fieldsHash) {
  return allowedFieldsOnCreate(fieldsHash).map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 1),
      name = _ref10[0];
    return ":".concat(name);
  }).join(',');
};
exports.fieldParametersForInsert = fieldParametersForInsert;
var executeStatementParamsForInsert = function executeStatementParamsForInsert(fieldsHash, model, transform) {
  return allowedFieldsOnCreate(fieldsHash).map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      name = _ref12[0],
      auroraType = _ref12[1].auroraType;
    //for flexibiity, we can pass a transformer function to manipulate our data
    var value = transform ? transform(name, model[name]) : model[name];
    return {
      name: name,
      value: _defineProperty({}, "".concat(auroraType, "Value"), value)
    };
  });
};
exports.executeStatementParamsForInsert = executeStatementParamsForInsert;
var allowedFieldsOnUpdate = function allowedFieldsOnUpdate(fieldsHash) {
  return Object.entries(fieldsHash).filter(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
      name = _ref14[0],
      allowOnUpdate = _ref14[1].allowOnUpdate;
    return allowOnUpdate;
  });
};
var fieldsForUpdate = function fieldsForUpdate(fieldsHash) {
  return allowedFieldsOnUpdate(fieldsHash).map(function (_ref15) {
    var _ref16 = _slicedToArray(_ref15, 1),
      name = _ref16[0];
    return "".concat(name, " = :").concat(name);
  }).join(',');
};
exports.fieldsForUpdate = fieldsForUpdate;
var executeStatementParamsForUpdate = function executeStatementParamsForUpdate(fieldsHash, model, transform) {
  return allowedFieldsOnUpdate(fieldsHash).map(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 2),
      name = _ref18[0],
      auroraType = _ref18[1].auroraType;
    var value = transform ? transform(name, model[name]) : model[name];
    return {
      name: name,
      value: _defineProperty({}, "".concat(auroraType, "Value"), value)
    };
  });
};

//Allowed datatypes in Aurora Data API
exports.executeStatementParamsForUpdate = executeStatementParamsForUpdate;
var AURORA_TYPE = {
  LONG: 'long',
  STRING: 'string',
  BOOLEAN: 'boolean'
};

/*
A single Aurora record looks something like this:
  [
    {
    "longValue": 1
    },
    {
    "stringValue": "System"
    },
    {
    "stringValue": "Administrator"
    },
    {
    "stringValue": "System Administrator"
    },
    {
    "booleanValue": true
    },
    {
    "stringValue": "admin@klaudsol.com"
    },
    {
    "stringValue": "2021-09-22 04:47:09"
    },
    {
    "longValue": 1
    }
  ]
  
  It is rather unwieldy, and has reliance on the order of the fields in the query, so we need a layer that shields the app from this 
  format, and just return a sane key-value Object.
*/
exports.AURORA_TYPE = AURORA_TYPE;
var fromAurora = function fromAurora(record, fields) {
  return Object.fromEntries(Object.entries(fields).map(function (_ref19, index) {
    var _ref20 = _slicedToArray(_ref19, 2),
      key = _ref20[0],
      auroraType = _ref20[1].auroraType;
    return [key, record[index]["".concat(auroraType, "Value")]];
  }));
};
exports.fromAurora = fromAurora;
var sanitizeData = function sanitizeData(rawData, fields) {
  var allowedFields = Object.entries(fields).map(function (_ref21) {
    var _ref22 = _slicedToArray(_ref21, 1),
      name = _ref22[0];
    return name;
  });
  return Object.fromEntries(Object.entries(rawData).filter(function (_ref23) {
    var _ref24 = _slicedToArray(_ref23, 1),
      key = _ref24[0];
    return allowedFields.includes(key);
  }));
};

/*the result of an insert field in Aurora API is:

{ generatedFields: [ { longValue: 26 } ],
  numberOfRecordsUpdated: 1 }

*/
exports.sanitizeData = sanitizeData;
var fromInsertAurora = function fromInsertAurora(record) {
  return {
    id: record.generatedFields[0].longValue
  };
};
exports.fromInsertAurora = fromInsertAurora;
var fromDeleteAurora = function fromDeleteAurora(record) {
  return record.numberOfRecordsUpdated > 0;
};
exports.fromDeleteAurora = fromDeleteAurora;