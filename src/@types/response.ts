interface monitorResponse {
    id: number;
    periodicity: string;
    url: string;
    regions: string[];
    name: string;
    description: string;
    method: string;
    body: string;
    active: boolean;
}