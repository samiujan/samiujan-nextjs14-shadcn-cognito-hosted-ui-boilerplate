import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { AuthUser } from '@/types/auth';

export async function GET(request: NextRequest) {
    const session = request.cookies.get('session');

    if (!session?.value) {
        return NextResponse.json({ user: null });
    }

    try {
        const decodedToken = jwt.decode(session.value) as AuthUser;
        return NextResponse.json({ user: decodedToken });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}