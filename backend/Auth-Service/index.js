import fs from 'fs';
import jwt from 'jsonwebtoken';
import jose from 'node-jose';
import 'dotenv/config';
const {JWK, JWE} = jose;

console.log("me")
const privateKey = fs.readFileSync("./certs/private");
console.log("you");
const publicKey = fs.readFileSync("./certs/key.pub");
console.log("them")

// const x = await JWK.asKey(_key)
// console.log(x)

const user = {
    name: "Ayanda M",
    email: 'ayandam@hotmail.com'
}
async function encrypt(data,key){
    console.log("new Key")
    // let _publicKey = await JWK.createKey("oct", 256, { alg: "A256GCM" });
    // console.log("hey:", _publicKey.toJSON() )
    const x = await JWK.asKey(key)
    console.log(x)
    // const _key = JSON.parse(key)
    // console.log(_key)
    const buffer = Buffer.from(data)
    const encrypted = await JWE.createEncrypt({ format: 'compact', contentAlg: "A256GCM" },x)
        .update(buffer).final();
    return encrypted;
}

const accessToken = jwt.sign(user,privateKey);
console.log("JWT: ", accessToken)
console.log("signed")
const jwe = encrypt(accessToken,_key);
printJWE(jwe)
async function printJWE(_jwe){
    let c = await _jwe;
    console.log("JWE: ",c);
}
// console.log("encrypted: ", jwe)

