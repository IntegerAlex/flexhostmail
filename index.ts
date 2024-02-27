// Description: This is the main file for the application. It contains the server setup and the routes.
import Fastify, { FastifyInstance } from "fastify";
import { sendOTP  , verifyOTP} from "./service";
import Redis from 'ioredis';

export const redis = new Redis({
    port: 6379,          
    host: process.env.REDIS_HOST || '35.237.121.154',  
    password:process.env.REDIS_PASSWORD || 'redis@123',
});

redis.on('connect', () => {
    console.log('Connected to Redis');
})
redis.on('error', (err) => {
    console.log('Redis Error: ' + err);
})

export const fastify:FastifyInstance = Fastify({ logger: true});

fastify.get("/", async (request, reply) => {
    
  return { hello: "world" };
//   reply.send({ hello: "world" });   
});

const allowedIPs = ['127.0.0.1','::1'];// Add your Backend IP here
fastify.addHook('preHandler', async (request, reply) => {
    const clientIP = request.ip;

    // Check if the client's IP is in the allowed list
    if (!allowedIPs.includes(clientIP)) {
        reply.code(403).send({ error: 'Forbidden: Access from your IP is not allowed.' });
        return;
    }

    // Log the request
});

fastify.get("/sendOTP", async (request, reply) => {
    const { email, userName}:any = request.query;
    const res = await sendOTP(email, userName);
    reply.send({result: res});
})

fastify.get('/verifyOTP', async (request, reply) => {
    try {
        const { email, otp, userName }: any = request.query;
        const result = await verifyOTP(email, otp, userName);
        if (result === 'Invalid OTP') {
            reply.status(400).send({ result });
        }
        reply.status(200).send({ result });
    } catch (error) {
        // Handle unexpected errors or errors thrown by verifyOTP
        console.error(error);
        reply.status(500).send({ result: 'Internal Server Error' });
    }
});



// Run the server!

fastify.listen({port:9543},(err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
    }
)

