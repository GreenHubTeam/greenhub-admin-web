export interface IProject {
    id: string;
    ongId: string;
    name: string;
    description: string;
    imagePath: string | null;
    categoryProjectId: string | null;
    status: "APPROVED" | "REPROVED" | "WAITING";
    createdAt: Date;
    updatedAt: Date;
    Ong: {
        id: string;
        imagePath: string | null;
        name: string;
    };
    _count?: {
        like: number;
        Donate: number;
        Feedback: number;
        View: number;
    }
};