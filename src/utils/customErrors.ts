import createError from '@fastify/error'

export const NotFoundError = createError('NOT_FOUND_ERROR', '%s', 404)

export const UnauthorizedError = createError('UNAUTHORIZED_ERROR', '%s', 401)
