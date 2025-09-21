export interface RegisterRequest {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    userId: string;
    token: string;
}
