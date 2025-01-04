import jwt from 'jsonwebtoken';

export function generateToken(payload: object, secret: string, options: jwt.SignOptions): string {
  const token = jwt.sign(payload, secret, options);
  return token;
}

export async function verifyToken(token: string, secret: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token,secret, (error, decoded) => {
        if (error) {
          return reject(new Error('invalid token'));
        }
        resolve(decoded);
      });
    });
  }