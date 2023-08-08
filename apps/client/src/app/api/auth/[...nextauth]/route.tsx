import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma, { PrismaClient } from '@pulsechat/db'
import NextAuth, { Session, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    adapter: PrismaAdapter(prisma as unknown as PrismaClient),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        })
    ],
    callbacks: {
        async session({ session, token, user }: {session: Session, token: JWT, user: User}): Promise<Session>{
            session.user.id = user.id
            return session
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
