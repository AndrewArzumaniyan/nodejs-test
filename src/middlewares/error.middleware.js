export const errorHandler = (err, req, res, next) => {
  // Логируем ошибку только в development режиме
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // Если ошибка уже отформатирована как ApiError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      // Стек только для development режима
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Обработка ошибок Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate Entry Error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Обработка неизвестных ошибок
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Обработчик для неотловленных промисов
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // В продакшене тут можно добавить отправку ошибки в систему мониторинга
});

// Обработчик для неотловленных исключений
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // В продакшене тут можно добавить отправку ошибки в систему мониторинга
  // И graceful shutdown
  process.exit(1);
});