import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Read signing key from pem file
const privateKey = fs.readFileSync(path.resolve(__dirname,"../certs/private-key.pem"));

export default (token_data)=>{
    return jwt.sign(token_data, privateKey, {algorithm: "RS256"});
}