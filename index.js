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
exports.fastify = exports.redis = void 0;
// Description: This is the main file for the application. It contains the server setup and the routes.
const fastify_1 = __importDefault(require("fastify"));
const service_1 = require("./service");
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    port: 6379,
    host: process.env.REDIS_HOST || '35.237.121.154',
    password: process.env.REDIS_PASSWORD || 'redis@123',
});
exports.redis.on('connect', () => {
    console.log('Connected to Redis');
});
exports.redis.on('error', (err) => {
    console.log('Redis Error: ' + err);
});
exports.fastify = (0, fastify_1.default)({ logger: true });
exports.fastify.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { hello: "world" };
    //   reply.send({ hello: "world" });   
}));
exports.fastify.addHook('preHandler', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = request.ip;
    console.log(`Client IP Address: ${ipAddress}`);
}));
exports.fastify.get("/sendOTP", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName } = request.query;
    const res = yield (0, service_1.sendOTP)(email, userName);
    reply.send({ result: res });
}));
exports.fastify.get('/verifyOTP', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, userName } = request.query;
        const result = yield (0, service_1.verifyOTP)(email, otp, userName);
        if (result === 'Invalid OTP') {
            reply.status(400).send({ result });
        }
        reply.status(200).send({ result });
    }
    catch (error) {
        // Handle unexpected errors or errors thrown by verifyOTP
        console.error(error);
        reply.status(500).send({ result: 'Internal Server Error' });
    }
}));
// Run the server!
exports.fastify.listen({ port: 8080 }, (err, address) => {
    if (err) {
        exports.fastify.log.error(err);
        process.exit(1);
    }
    exports.fastify.log.info(`server listening on ${address}`);
});
