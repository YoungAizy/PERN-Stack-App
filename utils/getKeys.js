import fs from 'fs';

const privateKey = fs.readFileSync("../certs/private");
console.log(privateKey)
export {privateKey};