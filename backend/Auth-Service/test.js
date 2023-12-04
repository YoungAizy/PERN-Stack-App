import jose from 'node-jose';
import fs from 'fs';

// jose.JWK.createKey("oct", 256, { alg: "A256GCM", use:"enc" }).
//          then(function(result) {
//           console.log(result.toJSON(true))
//            // {result} is a jose.JWK.Key
//            // {result.keystore} is a unique jose.JWK.KeyStore
//           ws.write(JSON.stringify(result.toJSON(true)),err=>{
//             err ? console.log(err): console.log("Key generated");
//           })
//          });

//Create an empty Keystore
const keystore = jose.JWK.createKeyStore();
var pem = fs.readFileSync('./private-key.pem');
jose.JWK.asKey(pem,"pem").then(result=>{
    keystore.add(result).then(_keyStore=>{
        console.log(_keyStore.toJSON())
    })
})