import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session');

    // Public paths that don't require authentication
    const publicPaths = ['/api/auth/callback'];
    if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        console.log('Public path accessed:', request.nextUrl.pathname);
        return NextResponse.next();
    }

    if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
        const signInUrl = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/login?` +
            new URLSearchParams({
                response_type: 'code',
                client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN!,
                scope: 'email openid profile',
            }).toString();

        console.log('Generated Sign-in URL:', signInUrl);
        console.log('Environment variables:', {
            domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
            clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
            redirectUri: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
        });

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};