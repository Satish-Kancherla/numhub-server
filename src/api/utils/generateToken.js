import jwt from "jsonwebtoken";

// import jwt from 'jsonwebtoken'
export function generateToken(user) {
    const options = { expiresIn: "1d" };
    const payload = {
        id: user.id,
        email: user.email,
    };
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey, options);
}
