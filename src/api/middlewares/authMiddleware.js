import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const AuthMiddleware = async (req, res, next) => {
 
    const token = req.cookies.token;

    if (!token) return res.status(401).send("NOT_SIGNED_IN");

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: id } });

        if (!user) return res.status(401).send("UNAUTHORIZED_TOKEN");

        req.user = { ...user }; 
        next();
    } catch (error) {
        console.error(error);
        res.apiError({ error: "Unauthorized" });
    }
};
