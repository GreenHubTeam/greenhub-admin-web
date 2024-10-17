interface User {
    id: string;
    name: string;
    document: string;
    email: string;
    imagePath: string | null;
    type: 'ONG' | 'ADMIN' | 'DONOR';
    createdAt: string;
}

export interface IOngType {
    id: string;
    name: string;
    document: string;
    about: string;
    zipcode: string;
    state: string;
    number: string;
    district: string;
    street: string;
    city: string;
    telephone: string;
    complement?: string;
    createdAt: string;
    updatedAt: string;
    imagePath?: string | null;
    userId: string;
    User: User;
}