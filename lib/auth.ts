// src/lib/auth.ts
export const COGNITO_CONFIG = {
    REGION: process.env.NEXT_PUBLIC_AWS_REGION!,
    USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    USER_POOL_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
    REDIRECT_SIGN_IN: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN!,
    REDIRECT_SIGN_OUT: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT!,
};

interface OAuthParams {
    scope: string;
    response_type: string;
    client_id: string;
    redirect_uri: string;
}

export const getSignInUrl = () => {
    const oauth: Record<string, string> = {
        scope: 'email openid profile',
        response_type: 'code',
        client_id: COGNITO_CONFIG.USER_POOL_CLIENT_ID,
        redirect_uri: COGNITO_CONFIG.REDIRECT_SIGN_IN,
    };

    const queryString = new URLSearchParams(oauth).toString();
    const url = `https://${COGNITO_CONFIG.DOMAIN}/login?${queryString}`;

    console.log('getSignInUrl generated:', url);
    console.log('COGNITO_CONFIG:', {
        ...COGNITO_CONFIG,
        CLIENT_ID: COGNITO_CONFIG.USER_POOL_CLIENT_ID.substring(0, 5) + '...' // Log partially hidden for security
    });

    return url;
};

export const getSignOutUrl = () => {
    const params: Record<string, string> = {
        client_id: COGNITO_CONFIG.USER_POOL_CLIENT_ID,
        logout_uri: COGNITO_CONFIG.REDIRECT_SIGN_OUT,
    };

    const queryString = new URLSearchParams(params).toString();
    return `https://${COGNITO_CONFIG.DOMAIN}/logout?${queryString}`;
};