import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        return response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.errorMessage,
        });
    }

}
