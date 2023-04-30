import createError from 'http-errors';

const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Your requested url was not found!'));
};

export default notFoundHandler;
