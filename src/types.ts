export interface User {
    userId: string;
    email: string;
    role: 'ADMIN' | 'USER' | 'OWNER';
}

export interface Rating {
    id: string;
    ratingValue: number;
    user: {
        id: string;
        name: string;
    }
}

export interface Store {
    id: string;
    name: string;
    email: string;
    address: string;
    averageRating: number;
    ratings?: Rating[];
    owner?: {
        id: string;
        name: string;
    }
}

export interface UserDetails {
    id: string;
    name: string;
    email: string;
    address: string;
    role: 'ADMIN' | 'USER' | 'OWNER';
}
