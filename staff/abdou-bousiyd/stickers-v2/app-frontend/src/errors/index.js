import createCustomError from "../utils/createCustomErrors"

const FormatError = createCustomError('FormatError')
const AuthError = createCustomError('AuthError')

export { FormatError, AuthError}