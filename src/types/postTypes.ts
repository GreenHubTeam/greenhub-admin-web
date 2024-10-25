export interface IPostType {
    id: string
    ongId: string
    description: string
    imagePath: string | null,
    createdAt: Date
    updatedAt: Date
    Ong: {
        name: string
        imagePath: string | null
    }
}