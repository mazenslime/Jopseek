type comp={
    id:string
}

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    company:comp;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    Role:'admin'|'owner'
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};
