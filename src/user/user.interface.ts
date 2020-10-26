export interface User {
    id?: string
    name?: string
    age?: number
    email?: string
    nutrition?: string
    password?: string
    role?: UserRole
}

export interface PaginatedUsers {
    users: User[]
    totalItems: number
    itemCount: number
    currentPage: number
    itemsPerPage: number
};

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    USER = 'user'
};