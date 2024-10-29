interface Authority {
    authority: string;
}

export interface Claims {
    authorities: Authority[];
    isAdmin: boolean;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}
