"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const pool_1 = __importDefault(require("./utils/pool"));
const config_1 = require("./utils/config");
/** get all users api */
// export const getUsers = async(req: Request, res: Response) => {
//     let allUsers;
//     try{
//     // get all users from the cached
//         let isCached;
//         const cachedUsers = await redisClient.get('allUsers');
//         if(cachedUsers){ //if cached users are available return cached users
//             isCached= true
//             return res.status(200).send({isCached, cachedUsers})
//         }
//         const query: Query = {
//         text: 'SELECT * FROM users ORDER BY id ASC',
//         values: []
//     }
//     pool.query(query, async(error, results) => {
//         if (error) {
//             throw error;
//         }
//         let responseData = {totalUser:results.rows.length, users:results.rows}
//         // isCached=false;
//         // await redisClient.set('allUsers', JSON.stringify(responseData))
//         // res.status(200).json({isCached,responseData});
//         redisClient.set('allUsers', JSON.stringify(responseData));
//         res.status(200).json({
//             isCached: false,
//             fetchedUsers: responseData
//         });
//     })}
//     catch(error){
//         res.status(500).json({error:(error as Error).message});
//     }
// }
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if data exists in cache
        const cachedData = yield config_1.redisClient.get('users');
        if (cachedData) {
            console.log('Data retrieved from cache');
            const parsedData = JSON.parse(cachedData);
            return res.status(200).json({
                isCached: true,
                cachedUsers: parsedData
            });
        }
        // Data not found in cache, fetch from PostgreSQL
        const query = {
            text: 'SELECT * FROM users ORDER BY id ASC',
            values: []
        };
        pool_1.default.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            const responseData = { totalUser: results.rows.length, users: results.rows };
            // Cache the data
            config_1.redisClient.set('users', JSON.stringify(responseData));
            res.status(200).json({
                isCached: false,
                fetchedUsers: responseData
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
/** get all users api */
const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        pool_1.default.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
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
