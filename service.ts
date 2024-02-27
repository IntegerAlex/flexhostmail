//Purpose: This file contains the service functions for the mailgun and redis
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import {redis} from './index'
dotenv.config(); 

// Create a mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'admin', key: process.env.MAILGUN_API_KEY || 'pubkey-a5afbf40a40a94d4cc832eedfca63be7'});

export async function sendOTP(email: string, userName: string) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const input = otp+email;
    const value = await encrypt(input);
    const  key = await encrypt(userName)
    await redis.set(key, value, 'EX', 60*5);
    // console.log(key, value)
    const res = await sendEmail(email, otp, userName);
    return res;
}


export async function verifyOTP(email: string, otp: number, userName: string) {
    try {
        const key:string = await encrypt(userName);
        // console.log('key', key);
        const value = await redis.get(key);
        const input= await encrypt(otp + email);

        // console.log('value', value);
        // console.log('input', input);

        if (value === input) {
            return "OTP Verified";
        } else {
            return "Invalid OTP";
        }
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        return "Internal Server Error";
    }
}




export async function sendEmail(email: string, otp: number, userName: string): Promise<boolean>{
    // Send an email
    mg.messages.create('sandbox0aa4e67489ef40d7aa183a1b66b55c8c.mailgun.org', {
	from: process.env.MAILGUN_DOMAIN || 'noreply@sandbox0aa4e67489ef40d7aa183a1b66b55c8c.mailgun.org',
	to: [email],
	subject: "OTP for Email Verification",
	text: `Hi ${userName}, Your OTP is ${otp}`,
	html: `<h1>Hi ${userName},</h1><p>Your OTP is ${otp}</p>`,
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
    return true;
}






// U2FsdGVkX182Ah8VMlTd1h5WLxANkCWVY/69wZB22KA=
// U2FsdGVkX18TehIE75QwAvmFqJ/v9iSeSRUBa5zkaVs=

const secretKey = CryptoJS.lib.WordArray.random(128/8); // 128-bit key
const fixedIV = CryptoJS.lib.WordArray.random(128/8); // Fixed initialization vector

async function encrypt(text: string) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey, { iv: fixedIV }).toString();
  return ciphertext; 
}



async function decrypt(ciphertext: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey, { iv: fixedIV });
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

// async function test(){
// const input = 123+'aksd'
// const text =  encrypt(input);
// console.log('encrypted:', text);
// console.log('decrypted:', decrypt(text));
// console.log('encrypted:', encrypt(input));
// // console.log('dexrypt:', await decrypt())
// }

