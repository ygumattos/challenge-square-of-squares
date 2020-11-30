const Error = err => {
  return {
    statusCode: err.statusCode ? err.statusCode : 500,
    message: err.message,
    error: true
  }
}

export default Error;
