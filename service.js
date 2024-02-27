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
exports.sendEmail = exports.verifyOTP = exports.sendOTP = void 0;
//Purpose: This file contains the service functions for the mailgun and redis
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const index_1 = require("./index");
dotenv_1.default.config();
// Create a mailgun client
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({ username: 'admin', key: process.env.MAILGUN_API_KEY || 'pubkey-a5afbf40a40a94d4cc832eedfca63be7' });
function sendOTP(email, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const input = otp + email;
        const value = yield encrypt(input);
        const key = yield encrypt(userName);
        yield index_1.redis.set(key, value, 'EX', 60 * 5);
        // console.log(key, value)
        const res = yield sendEmail(email, otp, userName);
        return res;
    });
}
exports.sendOTP = sendOTP;
function verifyOTP(email, otp, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = yield encrypt(userName);
            // console.log('key', key);
            const value = yield index_1.redis.get(key);
            const input = yield encrypt(otp + email);
            // console.log('value', value);
            // console.log('input', input);
            if (value === input) {
                return "OTP Verified";
            }
            else {
                return "Invalid OTP";
            }
        }
        catch (error) {
            console.error("Error in verifyOTP:", error);
            return "Internal Server Error";
        }
    });
}
exports.verifyOTP = verifyOTP;
function sendEmail(email, otp, userName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Send an email
        mg.messages.create('sandbox0aa4e67489ef40d7aa183a1b66b55c8c.mailgun.org', {
            from: "no-reply@sandbox0aa4e67489ef40d7aa183a1b66b55c8c.mailgun.org",
            to: [email],
            subject: "Hello",
            text: "Testing some Mailgun awesomeness!",
            html: `<h1>Testing some Mailgun awesomeness! ${otp}</h1>`
        })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error
        return true;
    });
}
exports.sendEmail = sendEmail;
// U2FsdGVkX182Ah8VMlTd1h5WLxANkCWVY/69wZB22KA=
// U2FsdGVkX18TehIE75QwAvmFqJ/v9iSeSRUBa5zkaVs=
const secretKey = crypto_js_1.default.lib.WordArray.random(128 / 8); // 128-bit key
const fixedIV = crypto_js_1.default.lib.WordArray.random(128 / 8); // Fixed initialization vector
function encrypt(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const ciphertext = crypto_js_1.default.AES.encrypt(text, secretKey, { iv: fixedIV }).toString();
        return ciphertext;
    });
}
function decrypt(ciphertext) {
    return __awaiter(this, void 0, void 0, function* () {
        const bytes = crypto_js_1.default.AES.decrypt(ciphertext, secretKey, { iv: fixedIV });
        const originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
        return originalText;
    });
}
// async function test(){
// const input = 123+'aksd'
// const text =  encrypt(input);
// console.log('encrypted:', text);
// console.log('decrypted:', decrypt(text));
// console.log('encrypted:', encrypt(input));
// // console.log('dexrypt:', await decrypt())
// }
