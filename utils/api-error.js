class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static unauthorized(msg) {
    return new ApiError(401, msg)
  }

  static paymentRequired(msg) {
    return new ApiError(402, msg)
  }

  static forbidden(msg) {
    return new ApiError(403, msg)
  }

  static notFound(msg) {
    return new ApiError(404, msg)
  }

  static notAllowed(msg) {
    return new ApiError(405, msg)
  }

  static notAcceptable(msg) {
    return new ApiError(406, msg)
  }

  static requestTimeout(msg) {
    return new ApiError(408, msg)
  }

  static unsupportedMedia(msg) {
    return new ApiError(415, msg)
  }

  static unprocessableEntity(msg) {
    return new ApiError(422, msg)
  }

  static failedDependancy(msg) {
    return new ApiError(424, msg)
  }

  static rateLimit(msg) {
    return new ApiError(429, msg)
  }

  static internal(msg) {
    return new ApiError(500, msg)
  }

  static notImplemented(msg) {
    return new ApiError(501, msg)
  }

  static serviceUnavailable(msg) {
    return new ApiError(503, msg)
  }
}

module.exports = ApiError;