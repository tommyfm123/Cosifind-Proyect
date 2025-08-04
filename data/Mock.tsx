import bcrypt from "bcryptjs";

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    favorites: string[];
}

const mockUsers: User[] = [
    {
        id: "1",
        email: "demo@usuario.com",
        passwordHash: bcrypt.hashSync("12345678910", 10),
        name: "Usuario Demo",
        favorites: ["abc123", "xyz789"],
    },
];

export function getUserByEmail(email: string): User | null {
    return mockUsers.find((user) => user.email === email) || null;
}
