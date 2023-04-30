// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    error: err,
  });
};

export default errorHandler;
