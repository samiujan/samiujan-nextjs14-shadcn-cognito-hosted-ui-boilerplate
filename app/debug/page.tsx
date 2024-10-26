'use client';

export default function DebugPage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Debug Information</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify({
                    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
                    NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
                    NEXT_PUBLIC_REDIRECT_SIGN_IN: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
                    // Hide full client ID for security
                    NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID?.substring(0, 5) + '...',
                }, null, 2)}
            </pre>
        </div>
    );
}