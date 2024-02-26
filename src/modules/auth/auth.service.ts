import { Prisma } from '@prisma/client'
import prisma from '../../prisma'

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const updateUserById = async (
  id: string,
  data: Prisma.UserUpdateInput
) => {
  return prisma.user.update({
    where: { id },
    data,
  })
}
