"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
const pool_1 = __importDefault(require("./utils/pool"));
/** get all users api */
const getUsers = (req, res) => {
    pool_1.default.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
exports.getUsers = getUsers;
/** get all users api */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool_1.default.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
exports.getUserById = getUserById;
/**Create new user */
const createUser = (req, res) => {
    const { name, email } = req.body;
    pool_1.default.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        res.
            status(200)
            .send({ message: `User added with ID: ${results.rows[0].id}`,
            results: results.rows[0]
        });
    });
};
exports.createUser = createUser;
