import { z } from 'zod'

const oauthProvider = z.enum(['GOOGLE', 'GITHUB', 'LINKEDIN'])

export const createUserSchema = z.object({
  email: z.string().email(),
  displayName: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
  oauthProvider: oauthProvider.optional(),
  oauthId: z.string().optional(),
  isVerified: z.boolean().default(false),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const updateUserSchema = createUserSchema.partial()

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export const createUserRequestSchema = z.object({
  body: createUserSchema,
})

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>

export const updateUserRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: updateUserSchema,
})

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>
