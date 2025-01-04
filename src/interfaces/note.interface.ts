export interface INotes{
    title: string;
    description: string;
    createdBy: number;
    isArchive: boolean;
    isTrash: boolean;
    id?: string | number;
}