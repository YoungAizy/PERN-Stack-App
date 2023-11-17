const jose = require('jose');
const fs = require('fs')

// let ws = fs.createWriteStream('./pipeOutput.pem.');

console.log("hello")
async function start(){
    // const c = await jose.generateKeyPair('PS256');
    const publicKey = fs.readFileSync('./key.pub');
    console.log(publicKey)

    // const privateJwk = await jose.exportJWK(privateKey)
    const publicJwk = await jose.exportJWK(publicKey)

    // console.log(privateJwk)
    console.log(publicJwk)
}

function writeToFile(data){
    var buf = Buffer.from(data);
    ws.write(buf, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("Writing stream finished")
        }
    });
}
start();