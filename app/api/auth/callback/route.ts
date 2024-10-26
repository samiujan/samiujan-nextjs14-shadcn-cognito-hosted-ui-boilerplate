import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { COGNITO_CONFIG } from '@/lib/auth';

const client = jwksClient({
    jwksUri: `https://cognito-idp.${COGNITO_CONFIG.REGION}.amazonaws.com/${COGNITO_CONFIG.USER_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, function (err, key: any) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.redirect('/auth/error');
    }

    try {
        // Exchange code for tokens
        const tokenEndpoint = `https://${COGNITO_CONFIG.DOMAIN}/oauth2/token`;
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: COGNITO_CONFIG.USER_POOL_CLIENT_ID,
            redirect_uri: COGNITO_CONFIG.REDIRECT_SIGN_IN,
            code,
        });

        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        const tokens = await response.json();

        // Verify ID token
        const decodedToken: any = await new Promise((resolve, reject) => {
            jwt.verify(
                tokens.id_token,
                getKey,
                {
                    algorithms: ['RS256'],
                },
                (err, decoded) => {
                    if (err) reject(err);
                    resolve(decoded);
                }
            );
        });

        // Set session cookie
        const response2 = NextResponse.redirect(new URL('/', request.url));
        response2.cookies.set('session', tokens.id_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response2;
    } catch (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect('/auth/error');
    }
}