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
exports.getCachedUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./utils/config");
//testing redis with a 5 secs delayed api
const isDataModified = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://pleasant-newt-girdle.cyclic.app/api/modified");
    return response.data.modified;
});
//testing redis with a 5 secs delayed api
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://pleasant-newt-girdle.cyclic.app/api/users");
    return response.data;
});
const getCachedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result; //result that will be returned
    let isCached; //the result source is it from cached or not cached
    try {
        const data = yield isDataModified();
        //if the data has been modified get the new data, and update the cached using set
        if (data === true) {
            result = yield getAllUsers();
            isCached = false;
            //setting cached data
            yield config_1.redisClient.set('allUsers', JSON.stringify(result));
        }
        //if the data hasn't been modified
        else {
            //get the cached data from redis
            const isCachedInRedis = yield config_1.redisClient.get('allUsers');
            if (isCachedInRedis) { //if the data is cached in redis
                isCached = true;
                //stringify the cached data
                result = JSON.parse(isCachedInRedis);
            }
            else { //if the data isn't cached we get it and cached the data
                result = yield getAllUsers();
                isCached = false;
                yield config_1.redisClient.set('allUsers', JSON.stringify(result));
            }
        }
        return res.status(200).json({
            isCached,
            result: result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});
exports.getCachedUsers = getCachedUsers;
