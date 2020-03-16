import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        // req.url = 'some url'; // This won't work because req is immutable, add it into req.clone's object input
        console.log(req.url);
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); // url: 'some-new-url'
        return next.handle(modifiedRequest); // If you don't return next handle and pass the request, then the request will not continue and therefore causing app to break
    }
}