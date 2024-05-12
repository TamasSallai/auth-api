import bcrypt from 'bcrypt'
import prisma from '../../prisma'
import { RegisterBodyType } from './auth.schema'

export const createUser = async ({ password, ...rest }: RegisterBodyType) => {
  const passwordHash = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      ...rest,
      password: passwordHash,
    },
  })
}

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}
