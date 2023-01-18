export type UserID = `user:${string}`;
export type User = {
    id: UserID;
    name: string;
    username: string;
    created: Date;
    updated: Date;
};

export type SigninDetails = {
    username: string;
    password: string;
};

export type SignupDetails = {
    name: string;
    username: string;
    password: string;
};

////////////////////////
//////// POSTS /////////
////////////////////////

export type PostID = `post:${string}`;
export type Post<TAuthorType extends UserID | User = UserID> = {
    id: PostID;
    title: string;
    body: string;
    author: TAuthorType;
    created: Date;
    updated: Date;
};

export type PostInput = Pick<Post, 'title' | 'body'>;