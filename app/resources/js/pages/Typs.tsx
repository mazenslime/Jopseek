import { Type } from "lucide-react";

export type Vacancy = {
    id: string;
    Title: string|'';
    Description: string |'';
    Location: string |'';
    Type: Types;
    Salary: string | number;
    Requiredskills: string |'';
    Viewcount: number|0;
    company?: Company | null;
    categoury?: Category | null;
    created_at: string|'';
};
export type Pagination = {
    current_page: number;
    data: Vacancy[];
    from: number | null;
    to: number | null;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
export type Props = {
    vacancies: Pagination;
    companies: Company[];
    categories: Category[];
    flash?: { success?: string; error?: string };
};
export type Company = { id: string; name: string };
export type Category = { id: string; Name: string };

export type Types ='Full-time' | 'Remote'|'Hybrid'|'Contract'|null