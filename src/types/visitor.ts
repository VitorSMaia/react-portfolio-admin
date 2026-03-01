
export interface VisitorLog {
    id: string;
    created_at: string;
    ip_address: string;
    country: string;
    city: string;
    latitude: number;
    longitude: number;
    session_id: string;
    user_agent: string;
    total_visits?: number;
    raw_data?: Record<string, unknown>;
}

export interface VisitorInfo {
    ip: string;
    country: string;
    city: string;
    loc?: string; // Format: "lat,lng"
    [key: string]: unknown;
}
