// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.status ? err.status : 500).json({
    errors: {
      common: {
        msg: err.message,
      },
    },
  });
};

export default errorHandler;
