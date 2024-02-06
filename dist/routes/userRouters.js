"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const query_1 = require("../query");
exports.router = (0, express_1.Router)();
exports.router.get('/', query_1.getUsers);
exports.router.get('/:id', query_1.getUserById);
exports.router.post('/', query_1.createUser);
