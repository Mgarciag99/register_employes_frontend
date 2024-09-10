export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    lastPage: number;
    limit: number;
}

export interface Columns{
    field: string;
    title?: string;
}

export interface Pagination{
    search: string,
    limit: number;
    page: number;
}