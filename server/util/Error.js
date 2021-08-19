module.exports.handleError = (error) => {
  const errors = { username: '', password: '' };
  if (error.code === 11000) {
    errors.username = 'Username already exists';
    errors.password = null;
  }
  if (error.message.includes('admin validation failed')) {
    Object.values(error.errors).forEach((err) => {
      errors[err.properties.path] = err.properties.message;
    });
  }
  return errors;
};
