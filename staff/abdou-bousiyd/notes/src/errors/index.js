const createCustomError = require('../utils/createCustomError')

// const FormatError = createCustomError('FormatError')
// const AuthError = createCustomError('AuthError')
const ConflictError = createCustomError('ConflictError')

module.exports = {
    // FormatError,
    // AuthError,
    ConflictError
}