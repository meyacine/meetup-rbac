import { HttpException } from '@nestjs/common';

export class SecurityException extends HttpException {
    public messageCode: string;
    public httpStatus: number;
    public errorMessage: string;

    constructor(messageCode: string, httpStatus: number, errorMessage: string) {
        super({messageCode, errorMessage, httpStatus}, httpStatus);
        this.messageCode = messageCode;
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }
}
