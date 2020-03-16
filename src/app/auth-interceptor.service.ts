import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        return next.handle(req); // If you don't return next handle and pass the request, then the request will not continue and therefore causing app to break
    }
}