import { Static, Type } from '@sinclair/typebox'

export const loginBodySchema = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false }
)

export const registerBodySchema = Type.Object(
  {
    displayName: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false }
)

export type LoginBodyType = Static<typeof loginBodySchema>
export type RegisterBodyType = Static<typeof registerBodySchema>
