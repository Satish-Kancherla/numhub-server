export const AdminMiddleware = (req, res, next) => {
    if (req.user.admin) {
        next();
    }
    else {
        return res.apiError({ error: "NOT_AN_ADMIN", message: "You Are Not Admin" });
    }
};
//# sourceMappingURL=adminMiddleware.js.map