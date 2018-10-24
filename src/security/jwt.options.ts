export class JwtOptions {
    algorithm: string;
    expiresIn: number | string;
    jwtid: string;

    constructor(options?: Partial<JwtOptions>) {
        Object.assign(this, options);
    }
}
