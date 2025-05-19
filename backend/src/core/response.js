exports.success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

exports.error = (res, err, message = 'Error', statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    message: err.message || message,
  });
};
