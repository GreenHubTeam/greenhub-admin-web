interface User {
    id: string;
    name: string;
    document: string;
    email: string;
    imagePath: string | null;
    type: 'ONG' | 'ADMIN' | 'DONOR'; // Ajuste conforme o tipo de usuário disponível
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
    complement?: string; // Campo opcional
    createdAt: string;
    updatedAt: string;
    imagePath?: string | null;
    userId: string;
    User: User;
}