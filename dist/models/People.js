"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DB = _interopRequireWildcard(require("../lib/DB"));
var _Logger = require("../lib/Logger");
var _UnauthorizedError = _interopRequireDefault(require("../errors/UnauthorizedError"));
var _Session = _interopRequireDefault(require("../models/Session"));
var _RecordNotFound = _interopRequireDefault(require("../errors/RecordNotFound"));
var _Math = require("../lib/Math");
var _Aurora = _interopRequireDefault(require("../lib/Aurora"));
var _Cognito = _interopRequireDefault(require("../lib/Cognito"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var People = /*#__PURE__*/function () {
  function People(rawData) {
    _classCallCheck(this, People);
    Object.assign(this, rawData);
  }
  _createClass(People, [{
    key: "displayName",
    value: function displayName() {
      return "".concat(this.first_name);
    }
  }], [{
    key: "fields",
    value:
    //TODO: Maybe we can interrogate the database so that this becomes DRY-er?
    function fields() {
      return {
        id: {
          auroraType: _DB.AURORA_TYPE.LONG,
          allowOnCreate: false
        },
        first_name: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true
        },
        last_name: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true
        },
        role: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true
        },
        login_enabled: {
          auroraType: _DB.AURORA_TYPE.BOOLEAN,
          allowOnCreate: true
        },
        email: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true
        },
        created_at: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: false
        }
      };
    }

    // fields for sme_people_professional

    /*
    static async displayPeopleProfessional() { // returns array of Timesheet Table
    const db = new DB();
    const sql = `select * from sme_people_professional`;
                
    const data = await db.executeStatement(sql, []);
    
    if (data.records.length === 0) {
      return null;
    } 
      const peopleRaw  = data.records;
    const people = peopleRaw.map(person => new People(fromAurora(person, People.peopleProfessionalFields())));
    return people;   
    }*/
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password, res) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.t0 = process.env.USER_MANAGER;
              _context.next = _context.t0 === "COGNITO" ? 4 : _context.t0 === "AURORA" ? 7 : 10;
              break;
            case 4:
              _context.next = 6;
              return _Cognito["default"].login({
                email: email,
                password: password,
                res: res
              });
            case 6:
              return _context.abrupt("return", _context.sent);
            case 7:
              _context.next = 9;
              return _Aurora["default"].login({
                email: email,
                password: password
              });
            case 9:
              return _context.abrupt("return", _context.sent);
            case 10:
              throw new Error();
            case 11:
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t1 = _context["catch"](0);
              throw _context.t1;
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 13]]);
      }));
      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "displayCurrentUser",
    value: function () {
      var _displayCurrentUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(session) {
        var db, session_data, people_id, sql, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // return User's information
              db = new _DB["default"]();
              _context2.next = 3;
              return _Session["default"].getSession(session);
            case 3:
              session_data = _context2.sent;
              // gets people_id and sme_tenant_id based on session
              people_id = session_data.people_id;
              sql = "select sme_people.id, sme_people.first_name, sme_people.last_name, sme_people.company_position, \n                  sme_people.login_enabled, sme_people.email, sme_people.created_at, sme_people.sme_timezone_id, \n                  sme_people.sme_tenant_id, sme_timezones.timezones_country, sme_timezones.timezones_offset\n                  FROM sme_people \n                  LEFT JOIN sme_timezones \n                  ON sme_people.sme_timezone_id = sme_timezones.id\n                  WHERE sme_people.id = :people_id AND\n                  sme_people.sme_tenant_id = :sme_tenant_id\n                  LIMIT 1";
              _context2.next = 8;
              return db.executeStatement(sql, [{
                name: "people_id",
                value: {
                  longValue: people_id
                }
              }, {
                name: "sme_tenant_id",
                value: {
                  longValue: session_data.sme_tenant_id
                }
              }]);
            case 8:
              data = _context2.sent;
              if (!(data.records.length === 0)) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", null);
            case 11:
              return _context2.abrupt("return", new People((0, _DB.fromAurora)(data.records[0], People.fields())));
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function displayCurrentUser(_x4) {
        return _displayCurrentUser.apply(this, arguments);
      }
      return displayCurrentUser;
    }() //TODO: Remove password change here.
  }, {
    key: "updateUserInfo",
    value: function () {
      var _updateUserInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref) {
        var id, first_name, last_name, email, oldPassword, newPassword, sme_timezone_id, db, encryptedPasswordPhrase, updateSql, checkPasswordSql, sqlPass, executeStatementParam, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref.id, first_name = _ref.first_name, last_name = _ref.last_name, email = _ref.email, oldPassword = _ref.oldPassword, newPassword = _ref.newPassword, sme_timezone_id = _ref.sme_timezone_id;
              db = new _DB["default"]();
              encryptedPasswordPhrase = newPassword ? "encrypted_password = sha2(CONCAT(:newPassword, salt), 256)," : "";
              updateSql = "UPDATE sme_people set first_name = :first_name, last_name = :last_name, email = :email, ".concat(encryptedPasswordPhrase, " sme_timezone_id = :sme_timezone_id WHERE id = :id");
              checkPasswordSql = "SELECT * FROM sme_people \n                                where id = :id AND encrypted_password = sha2(CONCAT(:oldPassword, salt), 256) LIMIT 1"; // !oldPassword/!newPassword is not working.
              // Validations for updating password
              if (!(oldPassword || newPassword)) {
                _context3.next = 11;
                break;
              }
              _context3.next = 8;
              return db.executeStatement(checkPasswordSql, [{
                name: "id",
                value: {
                  longValue: id
                }
              }, {
                name: "oldPassword",
                value: {
                  stringValue: oldPassword
                }
              }]);
            case 8:
              sqlPass = _context3.sent;
              if (!(sqlPass.records.length === 0)) {
                _context3.next = 11;
                break;
              }
              throw new _RecordNotFound["default"]("Incorrect password");
            case 11:
              executeStatementParam = {
                id: {
                  name: "id",
                  value: {
                    longValue: id
                  }
                },
                first_name: {
                  name: "first_name",
                  value: {
                    stringValue: first_name
                  }
                },
                last_name: {
                  name: "last_name",
                  value: {
                    stringValue: last_name
                  }
                },
                email: {
                  name: "email",
                  value: {
                    stringValue: email
                  }
                },
                newPassword: {
                  name: "newPassword",
                  value: {
                    stringValue: newPassword
                  }
                },
                sme_timezone_id: {
                  name: "sme_timezone_id",
                  value: {
                    longValue: sme_timezone_id
                  }
                }
              };
              if (!newPassword) delete executeStatementParam.newPassword;
              _context3.next = 15;
              return db.executeStatement(updateSql, Object.values(executeStatementParam));
            case 15:
              data = _context3.sent;
              return _context3.abrupt("return", true);
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function updateUserInfo(_x5) {
        return _updateUserInfo.apply(this, arguments);
      }
      return updateUserInfo;
    }() //A password changer needs a method of its own for security purposes
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref2) {
        var email, session, oldPassword, newPassword;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              email = _ref2.email, session = _ref2.session, oldPassword = _ref2.oldPassword, newPassword = _ref2.newPassword;
              _context4.prev = 1;
              _context4.t0 = process.env.USER_MANAGER;
              _context4.next = _context4.t0 === "COGNITO" ? 5 : _context4.t0 === "AURORA" ? 8 : 11;
              break;
            case 5:
              _context4.next = 7;
              return _Cognito["default"].updatePassword({
                email: email,
                session: session,
                oldPassword: oldPassword,
                newPassword: newPassword
              });
            case 7:
              return _context4.abrupt("return", _context4.sent);
            case 8:
              _context4.next = 10;
              return _Aurora["default"].updatePassword({
                session: session,
                oldPassword: oldPassword,
                newPassword: newPassword
              });
            case 10:
              return _context4.abrupt("return", _context4.sent);
            case 11:
              throw new Error();
            case 12:
              _context4.next = 17;
              break;
            case 14:
              _context4.prev = 14;
              _context4.t1 = _context4["catch"](1);
              throw _context4.t1;
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 14]]);
      }));
      function updatePassword(_x6) {
        return _updatePassword.apply(this, arguments);
      }
      return updatePassword;
    }() //This is deprecated. Use Session.assert instead.
  }, {
    key: "isSessionAlive",
    value: function () {
      var _isSessionAlive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(session_token) {
        var db, sql, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              db = new _DB["default"]();
              sql = "SELECT sme_sessions.session FROM sme_sessions JOIN people ON sme_sessions.people_id = sme_people.id WHERE \n      sme_sessions.session = :session AND\n      sme_sessions.session_expiry >= NOW() AND\n      sme_people.login_enabled = 1 \n    ";
              _context5.prev = 2;
              _context5.next = 5;
              return db.executeStatement(sql, [{
                name: "session",
                value: {
                  stringValue: session_token
                }
              }]);
            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", data.records.length > 0);
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              console.error(_context5.t0);
              return _context5.abrupt("return", false);
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 9]]);
      }));
      function isSessionAlive(_x7) {
        return _isSessionAlive.apply(this, arguments);
      }
      return isSessionAlive;
    }()
  }, {
    key: "findBySession",
    value: function () {
      var _findBySession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(session) {
        var _person_raw, db, fields, sql, data, person_raw, SME_TENANTS_HOMEPAGE, sme_tenants_homepage, person;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              db = new _DB["default"](); //TODO: We need to think on how to do joins elegantly.
              //Is it time to use an ORM? Is it worth the effort?
              fields = [].concat(_toConsumableArray(Object.keys(People.fields()).map(function (key) {
                return "sme_people.".concat(key);
              })), ["sme_tenants.homepage"]);
              sql = "SELECT ".concat(fields.join(","), " FROM sme_sessions \n        JOIN sme_people ON sme_sessions.people_id = sme_people.id \n        JOIN sme_tenants ON sme_sessions.sme_tenant_id = sme_tenants.id\n        WHERE \n        sme_sessions.session = :session AND\n        sme_sessions.session_expiry >= NOW() AND\n        sme_people.login_enabled = 1 \n        LIMIT 1\n      ");
              _context6.next = 6;
              return db.executeStatement(sql, [{
                name: "session",
                value: {
                  stringValue: session
                }
              }]);
            case 6:
              data = _context6.sent;
              person_raw = data.records[0]; //fields not in the people table, as it is a join. How to do this elegantly?
              SME_TENANTS_HOMEPAGE = 0;
              sme_tenants_homepage = (_person_raw = person_raw[Object.keys(People.fields()).length + SME_TENANTS_HOMEPAGE]) === null || _person_raw === void 0 ? void 0 : _person_raw.stringValue;
              person = new People((0, _DB.fromAurora)(person_raw, People.fields())); //again, how do we do relationships elegantly?
              person.tenant = {
                homepage: sme_tenants_homepage
              };
              return _context6.abrupt("return", person);
            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              (0, _Logger.log)(_context6.t0.stack);
              return _context6.abrupt("return", false);
            case 19:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 15]]);
      }));
      function findBySession(_x8) {
        return _findBySession.apply(this, arguments);
      }
      return findBySession;
    }() //Let the controller handle the exceptions
  }, {
    key: "all",
    value: function () {
      var _all = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(session) {
        var db, fields, sql, data, peopleRaw, people;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              db = new _DB["default"]();
              fields = _toConsumableArray(Object.keys(People.fields()).map(function (key) {
                return "sme_people.".concat(key);
              }));
              sql = "SELECT ".concat(fields.join(","), " FROM sme_people_tenants\n        LEFT JOIN sme_people ON sme_people_tenants.sme_people_id = sme_people.id \n        LEFT JOIN sme_sessions ON sme_people_tenants.sme_tenant_id = sme_sessions.sme_tenant_id\n        WHERE \n          sme_sessions.session = :session AND\n          sme_sessions.session_expiry >= NOW()\n        ORDER BY first_name ASC\n      ");
              _context7.next = 5;
              return db.executeStatement(sql, [{
                name: "session",
                value: {
                  stringValue: session
                }
              }]);
            case 5:
              data = _context7.sent;
              peopleRaw = data.records;
              people = peopleRaw.map(function (person) {
                return new People((0, _DB.fromAurora)(person, People.fields()));
              });
              return _context7.abrupt("return", people);
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function all(_x9) {
        return _all.apply(this, arguments);
      }
      return all;
    }()
  }, {
    key: "peopleProfessionalFields",
    value: function peopleProfessionalFields() {
      return {
        sme_people_id: {
          auroraType: _DB.AURORA_TYPE.LONG,
          allowOnCreate: true,
          allowOnUpdate: true
        },
        payment_to: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true,
          allowOnUpdate: true
        },
        code: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true,
          allowOnUpdate: true
        },
        rate: {
          auroraType: _DB.AURORA_TYPE.STRING,
          allowOnCreate: true,
          allowOnUpdate: true
        }
      };
    }
  }, {
    key: "displayPeopleProfessional",
    value: function () {
      var _displayPeopleProfessional = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(session) {
        var db, session_data, sme_tenant_id, sql, executeStatementParam, data, peopleRaw, people;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              // returns array of Timesheet Table
              db = new _DB["default"]();
              _context8.next = 3;
              return _Session["default"].getSession(session);
            case 3:
              session_data = _context8.sent;
              // gets people_id and sme_tenant_id based on session
              sme_tenant_id = session_data.sme_tenant_id;
              sql = "select sme_people_id, payment_to, code, rate from sme_people_professional \n                 WHERE sme_tenant_id = :sme_tenant_id";
              executeStatementParam = [{
                name: "sme_tenant_id",
                value: {
                  longValue: sme_tenant_id
                }
              }];
              _context8.next = 9;
              return db.executeStatement(sql, executeStatementParam);
            case 9:
              data = _context8.sent;
              if (!(data.records.length === 0)) {
                _context8.next = 12;
                break;
              }
              return _context8.abrupt("return", null);
            case 12:
              peopleRaw = data.records;
              people = peopleRaw.map(function (person) {
                return new People((0, _DB.fromAurora)(person, People.peopleProfessionalFields()));
              });
              return _context8.abrupt("return", people);
            case 15:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function displayPeopleProfessional(_x10) {
        return _displayPeopleProfessional.apply(this, arguments);
      }
      return displayPeopleProfessional;
    }()
  }]);
  return People;
}();
var _default = People;
exports["default"] = _default;