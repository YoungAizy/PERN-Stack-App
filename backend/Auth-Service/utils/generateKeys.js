import jose from "node-jose";
import fs from 'fs';

// const ws = fs.createWriteStream('../certs/secret.json')
const jwks = fs.createWriteStream('../public/.well-known/jwks.json');

// jose.JWK.createKey("oct", 256, { alg: "A256GCM", use:"enc" }).
//          then(function(result) {
//           console.log(result.toJSON(true))
//            // {result} is a jose.JWK.Key
//            // {result.keystore} is a unique jose.JWK.KeyStore
//           ws.write(JSON.stringify(result.toJSON(true)),err=>{
//             err ? console.log(err): console.log("Key generated");
//           })
//          });



const privateKey = fs.readFileSync("../certs/private");
const _pk = await jose.JWK.asKey(privateKey,'pem');
console.log(_pk);
// const publicKey = fs.readFileSync("../certs/key.pub");
// const pubK = await jose.JWK.asKey(publicKey, 'pem');
// console.log(pubK);
//const secr = fs.readFileSync("../certs/secret.json");

const keystore = jose.JWK.createKeyStore();
await keystore.add(_pk);
jwks.write(JSON.stringify(keystore.toJSON()),err=>{
                err ? console.log(err): console.log("Key generated");
              })

var output = keystore.toJSON();
console.log(output);