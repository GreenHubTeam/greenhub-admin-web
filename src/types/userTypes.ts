export interface IUser {
    id: string;
    document: string;
    email: string;
    name: string;
    type: 'ADMIN' | 'DONOR' | 'ONG';
    createdAt: Date;
    updatedAt: Date;
    imagePath: string;
}