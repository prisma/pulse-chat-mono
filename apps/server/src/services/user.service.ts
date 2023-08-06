import prisma, { Prisma } from '@pulsechat/db'

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data })
}

export async function findUserByEmail(email: Prisma.UserFieldRefs['email']) {
  return prisma.user.findUnique({ where: { email } })
}
