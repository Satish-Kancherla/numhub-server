export function sanitizeUser(user) {
    const sanitizedUser = user;
    delete sanitizedUser.password;
    delete sanitizedUser.id;
    return sanitizedUser;
}