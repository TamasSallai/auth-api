import { z } from 'zod'

export const loginRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>

export const registerRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
})

export type RegisterRequest = z.infer<typeof registerRequestSchema>

export const verifyRequestSchema = z.object({
  params: z.object({
    token: z.string(),
  }),
})

export type VerifyRequest = z.infer<typeof verifyRequestSchema>
