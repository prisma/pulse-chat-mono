import { z } from 'zod'

export const SigninSchema = z.object({
    email: z.string().email()
})

export const SignupSchema = z.object({
    email: z.string().email(),
    name: z.string()
})