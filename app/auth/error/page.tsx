// app/auth/error/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AuthError() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
                <p className="mb-4">There was a problem authenticating your request.</p>
                <Button onClick={() => router.push('/')}>
                    Return to Home
                </Button>
            </div>
        </div>
    );
}