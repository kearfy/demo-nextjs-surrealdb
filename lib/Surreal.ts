import AwaitedSurreal from '@theopensource-company/awaited-surrealdb';
import { SigninDetails, SignupDetails } from '../constants/Types';

// Define connection details for our surrealdb instance.
export const SurrealEndpoint =
    process.env.NEXT_PUBLIC_SURREAL_ENDPOINT ?? `http://localhost:8000/rpc`;
export const SurrealNamespace =
    process.env.NEXT_PUBLIC_SURREAL_NAMESPACE ?? 'test';
export const SurrealDatabase =
    process.env.NEXT_PUBLIC_SURREAL_DATABASE ?? 'test';

export const SurrealInstance = new AwaitedSurreal({
    endpoint: SurrealEndpoint,
    namespace: SurrealNamespace,
    database: SurrealDatabase,
    token: async () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('usersession');
        }
    },
});

// Opiniated wrapper function for this DB schema.
// Also stores the user token in localStorage.
export const SurrealSignin = async (auth: SigninDetails): Promise<boolean> =>
    new Promise((resolve) => {
        SurrealInstance.signin({
            NS: SurrealNamespace,
            DB: SurrealDatabase,
            SC: 'user',
            ...auth,
        })
            .then(async (res) => {
                localStorage.setItem('usersession', res);
                resolve(true);
            })
            .catch((error) => {
                console.error('Failed to authenticate:', error);
                resolve(false);
            });
    });

// Opiniated wrapper function for this DB schema.
// Also stores the user token in localStorage.
export const SurrealSignup = async (auth: SignupDetails): Promise<boolean> =>
    new Promise((resolve) => {
        SurrealInstance.signup({
            NS: SurrealNamespace,
            DB: SurrealDatabase,
            SC: 'user',
            ...auth,
        })
            .then(async (res) => {
                localStorage.setItem('usersession', res);
                resolve(true);
            })
            .catch((error) => {
                console.error('Failed to register:', error);
                resolve(false);
            });
    });

// Opiniated wrapper function for this DB schema.
// Also removes the user token from localStorage.
export const SurrealSignout = async (): Promise<boolean> =>
    new Promise((resolve) => {
        SurrealInstance.invalidate()
            .then(async () => {
                localStorage.removeItem('usersession');
                location.reload(); // FIXME: Needed until Beta 9.
                resolve(false);
            })
            .catch((error) => {
                console.error(error);
                resolve(true);
            });
    });
