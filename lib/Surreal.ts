import Surreal, { Result } from 'surrealdb.js';
import { SigninDetails, SignupDetails } from '../constants/Types';

export const SurrealEndpoint = `http://localhost:8000/rpc`;
export const SurrealNamespace = 'test';
export const SurrealDatabase = 'test';
export const SurrealInstance = new Surreal(SurrealEndpoint);

export const SurrealInit = (async () => {
    const token = localStorage.getItem('usersession');
    await SurrealInstance.use(SurrealNamespace, SurrealDatabase);
    if (token)
        await SurrealInstance.authenticate(token).catch(
            (_e) => 'Failed to authenticate'
        );
})();

export const SurrealQuery = async <T = unknown>(
    query: string,
    vars?: Record<string, unknown>
): Promise<Result<T[]>[]> => {
    await SurrealInit;
    return SurrealInstance.query<Result<T[]>[]>(query, vars);
};

export const SurrealSignin = async (auth: SigninDetails): Promise<boolean> =>
    new Promise((resolve) => {
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

export const SurrealSignup = async (auth: SignupDetails): Promise<boolean> =>
    new Promise((resolve) => {
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

export const SurrealSignout = async (): Promise<boolean> =>
    new Promise((resolve) => {
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
