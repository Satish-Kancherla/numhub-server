import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
        "string.base": "Name should be a type of text",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should be at least 2\ characters long",
        "string.max": "Name should not exceed 30 characters",
        "any.required": "Name is required",
    }),

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

const signupValidator = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const formattedErrors = error.details.map((err) => ({
            [err.path.join(".")]: err.message,
        }));
        return res.apiError({error:formattedErrors});
    }

    next();
};

export { signupValidator };
