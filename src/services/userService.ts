import type { User } from "../types/user";

export const fetchUser = async (): Promise<User[]> => {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const userJson: User[] = await user.json();
    return userJson;
};
