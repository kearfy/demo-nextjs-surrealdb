import Surreal, { Result } from 'surrealdb.js';
import { SigninDetails, SignupDetails } from '../constants/Types';

// Define connection details for our surrealdb instance.
export const SurrealEndpoint = `http://localhost:8000/rpc`;
export const SurrealNamespace = 'test';
export const SurrealDatabase = 'test';
export const SurrealInstance = new Surreal(SurrealEndpoint);

// Here we store the result of an async function in a variable, so that we can await it later.
// My first approach was to not render content until surrealdb was finished, though this is a horrible approach.
// Even after JS promises have been fulfilled, we can still await them.
// This way the content can load as usual, whilst surrealdb can initialize at it's own pase.
export const SurrealInit = (async () => {
    if (typeof window !== 'undefined') {
        // Connect to proper NS/DB and attempt to authenticate user on page load.
        const token = localStorage.getItem('usersession');
        await SurrealInstance.use(SurrealNamespace, SurrealDatabase);
        if (token)
            await SurrealInstance.authenticate(token).catch(
                (_e) => 'Failed to authenticate'
            );
    }
})();

// Just a wrapper function for the query function of surrealdb.js.
// I did not like the way that the types work there by default :D
export const SurrealQuery = async <T = unknown>(
    query: string,
    vars?: Record<string, unknown>
): Promise<Result<T[]>[]> => {
    // Wait until the SurrealDB instance has initialized, then execute query.
    await SurrealInit;
    return SurrealInstance.query<Result<T[]>[]>(query, vars);
};

// Opiniated wrapper function for this DB schema.
// Also stores the user token in localStorage.
export const SurrealSignin = async (auth: SigninDetails): Promise<boolean> =>
    new Promise((resolve) => {
        // Wait until the SurrealDB instance has initialized, then attempt signin.
        SurrealInit.then(() =>
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
                })
        );
    });

// Opiniated wrapper function for this DB schema.
// Also stores the user token in localStorage.
export const SurrealSignup = async (auth: SignupDetails): Promise<boolean> =>
    new Promise((resolve) => {
        // Wait until the SurrealDB instance has initialized, then attempt signup.
        SurrealInit.then(() =>
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
                })
        );
    });

// Opiniated wrapper function for this DB schema.
// Also removes the user token from localStorage.
export const SurrealSignout = async (): Promise<boolean> =>
    new Promise((resolve) => {
        // Wait until the SurrealDB instance has initialized, then signout.
        SurrealInit.then(() =>
            SurrealInstance.invalidate()
                .then(async () => {
                    localStorage.removeItem('usersession');
                    location.reload(); // FIXME: Needed until Beta 9.
                    resolve(false);
                })
                .catch((error) => {
                    console.error(error);
                    resolve(true);
                })
        );
    });
