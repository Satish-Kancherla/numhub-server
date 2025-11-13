export const formatMiddleware = ({ req, res, next }) => {
    res.apiSuccess = ({data, message}) => {
        res.status(200).json({
            status: true,
            message,
            data,
        });
    };

    res.apiResponse = ({ data, status, message }) => {
        res.status(status).json({
            status: true,
            message,
            data,
        });
    };

    res.apiError = ({ error, status = 400, message }) => {
        res.status(status).json({
            status: false,
            message,
            error: error,
        });
    };

    next();
};
