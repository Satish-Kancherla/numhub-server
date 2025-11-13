import { generateToken } from "../utils/generateToken.js";
import { prisma } from "../utils/prisma.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import bcrypt from "bcrypt";
const authController = {
    async signin(req, res) {
        try {
            const body = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            console.log(user);
            if (!user || !(await bcrypt.compare(body.password, user.password))) {
                return res.apiError({ message: "Email or Password is incorrect" });
            }
            const token = generateToken(user);
            const sanitizedUser = sanitizeUser(user);
            res.cookie("admin", sanitizedUser.admin, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 1000 * 60 * 60 * 24 });
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 1000 * 60 * 60 * 24 });
            return res.apiSuccess({ data: sanitizedUser, message: "Authenticated" });
        }
        catch (error) {
            return res.apiError({ message, message: "server error" });
        }
    },
    async signup(req, res) {
        const body = req.body;
        const exists = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (exists) {
            return res.apiError({ message: "User Already Exists", status: 403 });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                    ...body,
                    password: hashedPassword,
                },
            });
            const token = generateToken(user);
            const sanitizedUser = sanitizeUser(user);
            res.cookie("admin", sanitizedUser.admin, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 3600000 });
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 3600000 });
            return res.apiSuccess({ data: sanitizedUser, message: "User Created Successfully" });
        }
        catch (error) {
            return res.apiError({ message });
        }
    },
    async me(req, res) {
        const sanitizedUser = sanitizeUser(req.user);
        return res.apiSuccess({ data: { ...sanitizedUser } });
    },
    async changePassword(req, res) {
        const body = req.body;
        const user = req.user;
        const { password } = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        const valid = await bcrypt.compare(body.cpassword, password);
        if (!valid)
            return res.apiError({ message: "Invalid Current password" });
        const hashedPassword = await bcrypt.hash(body.npassword, 10);
        const nuser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        const token = generateToken(nuser);
        const sanitizedUser = sanitizeUser(nuser);
        res.cookie("admin", sanitizedUser.admin, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 3600000 });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 3600000 });
        return res.apiSuccess({ data: sanitizedUser, message: "User Created Successfully" });
    },
    async logout(req, res) {
        res.cookie("token", "", {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            expires: new Date(0),
        });
        res.cookie("admin", "", {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            expires: new Date(0),
        });
        res.apiSuccess({ message: "Cookie deleted successfully" });
    },
};
export { authController };
//# sourceMappingURL=authController.js.map