export interface IUser {
    id: string; // ID no formato UUID
    document: string; // CPF ou CNPJ
    email: string;
    name: string;
    type: 'ADMIN' | 'DONOR' | 'ONG'; // Tipos de usuário, pode ajustar conforme o caso
    createdAt: Date; // Data de criação
    updatedAt: Date; // Data de atualização
    imagePath: string; // Caminho para a imagem de perfil
}