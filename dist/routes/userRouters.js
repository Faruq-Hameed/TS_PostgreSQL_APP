"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const query_1 = require("../query");
const cache_1 = require("../cache");
exports.router = (0, express_1.Router)();
//routes
exports.router.post('/', query_1.createUser);
exports.router.get('/users', cache_1.getCachedUsers);
exports.router.get('/', query_1.getUsers);
exports.router.get('/:id', query_1.getUserById);
exports.router.put('/:id', query_1.updateUser);
exports.router.delete('/:id', query_1.deleteUser);
