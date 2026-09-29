export const errorHandler = (err, req, res, next) => {
  console.error('[API Error]:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      statusCode
    }
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
      statusCode: 404
    }
  });
};
