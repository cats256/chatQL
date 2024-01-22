"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_merge_1 = require("lodash.merge");
var user_1 = require("./user");
var resolvers = (0, lodash_merge_1.default)({}, user_1.default);
exports.default = resolvers;
