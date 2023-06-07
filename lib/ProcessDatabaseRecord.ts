import { type Post, type User, type UserID } from '../constants/Types';

// Process stuff like dates from the database to JS date objects, properly format data.

export function processUserRecord(user: User) {
    return {
        ...user,
        created: new Date(user.created),
        updated: new Date(user.updated),
    };
}

export function processPostRecord<TAuthorType extends UserID | User = UserID>(
    post: Post<TAuthorType>
): Post<TAuthorType> {
    return {
        ...post,
        created: new Date(post.created),
        updated: new Date(post.updated),
        author:
            typeof post.author == 'object'
                ? {
                      ...post.author,
                      created: new Date(post.author.created),
                      updated: new Date(post.author.updated),
                  }
                : post.author,
    };
}
