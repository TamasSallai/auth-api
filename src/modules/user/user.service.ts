import * as bcrypt from 'bcrypt'
import prisma from '../../prisma'
import { CreateUserInput, UpdateUserInput } from './user.schema'

const create = async (data: CreateUserInput) => {
  const { password, oauthProvider } = data

  if (!oauthProvider && !password) {
    throw new Error('Password is required')
  }

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10)
    data.password = passwordHash
  }

  return prisma.user.create({ data })
}

const findAll = () => {
  return prisma.user.findMany()
}

const findOneById = (id: string) => {
  return prisma.user.findUnique({ where: { id } })
}

const findOneByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

const update = (id: string, data: UpdateUserInput) => {
  return prisma.user.update({ where: { id }, data })
}

const remove = (id: string) => {
  return prisma.user.delete({ where: { id } })
}

export default {
  create,
  findAll,
  findOneById,
  findOneByEmail,
  update,
  remove,
}
