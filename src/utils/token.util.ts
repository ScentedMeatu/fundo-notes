import jwt from 'jsonwebtoken';

export async function generateToken (payload,secret,expiry) {
    const token = await jwt.sign(payload,secret,expiry);
    return token;
}