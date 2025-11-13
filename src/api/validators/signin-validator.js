import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(8).required().messages({
        "string.base": "Password should be text",
        "string.min": "Password should be at least 8 characters long",
        "any.required": "Password is required",
    }),
});

const signinValidator = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const formattedErrors = error.details.map((err) => ({
            [err.path.join(".")]: err.message,
        }));
        return res.apiError({error:formattedErrors});
    }

    next();
};

export { signinValidator };
