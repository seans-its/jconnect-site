export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // Optional field for user profile picture
    roles: string[]; // Array of roles assigned to the user
    createdAt: Date; // Date when the user was created
    updatedAt: Date; // Date when the user was last updated
};