interface Authority {
    authority: string;
}

export interface Claims {
    authorities: Authority[];
    isAdmin: boolean;
    email: string;
    sub: string;
    iat: number;
    exp: number;
}
