import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicKey = fs.readFileSync(path.resolve( __dirname, '../certs/public-key.pem'));

export default function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const parts = bearerHeader.split(' ');
    const token = parts[1]
    let email;
    if (token != null) {
        jwt.verify(token, publicKey, (err, user) => {
            if (err) {
                res.sendStatus(403)
                return;
            }
            email = user.email;
        })
    }
    req.body.data.email = email;
    next();
}