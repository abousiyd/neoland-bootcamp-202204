function createCustomError(name) {
    const customError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    customError.prototype.name = name

    return customError
}

module.exports = createCustomError