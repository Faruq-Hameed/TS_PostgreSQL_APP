"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const pool_1 = __importDefault(require("./utils/pool"));
/** get all users api */
const getUsers = (req, res) => {
    pool_1.default.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({ totalUser: results.rows.length, users: results.rows });
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
// /**update user */
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const query = {
        text: 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        values: [name, email, id]
    };
    pool_1.default.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        // Check if any rows were updated
        if (results.rowCount === 0) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        //if a user is found return the updated user
        res.status(200).send({
            message: `User modified with ID: ${id}`,
            updatedUser: results.rows[0]
        });
    });
};
exports.updateUser = updateUser;
//DELETE A USER
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const query = {
        text: ('DELETE FROM users WHERE id = $1'),
        values: [id]
    };
    pool_1.default.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        //check if any user was deleted
        if (result.rowCount === 0) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        res.status(200).send({ message: `User deleted with ID: ${id}`, results: result.rows[0] });
    });
};
exports.deleteUser = deleteUser;
