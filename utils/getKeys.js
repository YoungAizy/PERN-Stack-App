const fs = require('fs');

const privateKey = fs.readFileSync("../certs/private");
console.log(privateKey)
module.exports = {privateKey};