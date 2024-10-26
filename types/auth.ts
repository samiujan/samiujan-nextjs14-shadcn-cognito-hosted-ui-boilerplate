export interface AuthUser {
    sub: string;
    email: string;
    email_verified: boolean;
    name?: string;
}