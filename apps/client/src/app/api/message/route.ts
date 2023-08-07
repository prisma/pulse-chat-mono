import prisma from '@pulsechat/db'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({
            message: 'unauthorized'
        }, { status: 401 })
    
       await prisma.chat.create({
            data: {
                message: body.message,
                user: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        })
    } catch ( e ) {
        return NextResponse.json({
            message: 'There was a problem creating the message.'
        }, { status: 500 })
    }

    return NextResponse.json({
        message: 'success'
    }, { status: 200 })
}
