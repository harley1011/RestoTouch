"use strict";
var index_1 = require('./about/index');
var index_2 = require('./home/index');
exports.routes = index_2.HomeRoutes.concat(index_1.AboutRoutes);
