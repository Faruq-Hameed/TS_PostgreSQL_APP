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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // to block requests from different origins
const userRouters_1 = require("./routes/userRouters");
const config_1 = require("./utils/config");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3030');
app.use((0, cors_1.default)()); //enable CORS for all origins.
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', userRouters_1.router);
app.get('*', (req, res) => {
    res.status(400).json({ message: 'Invalid endpoint' });
});
//error handler
app.use((req, res, next) => {
    const error = new Error('Something went wrong');
    next(error);
});
// Error-handling Middleware
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
};
app.use(errorMiddleware);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.redisClient.connect(); //connect to redis server
        app.listen(port, () => {
            console.log('server is connected to redis and listening on port ' + port);
        });
    }
    catch (error) {
        console.log('error connecting to redis server : ' + error.message);
    }
});
startServer();
