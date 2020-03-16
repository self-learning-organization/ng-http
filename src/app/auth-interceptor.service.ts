import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        // req.url = 'some url'; // This won't work because req is immutable, add it into req.clone's object input
        console.log(req.url);
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); // url: 'some-new-url'
        return next.handle(modifiedRequest).pipe(tap(event => { // Instead of tap, I can also use other operators like map and even transform the response 
            console.log(event);
            if (event.type === HttpEventType.Response) {
                console.log('Response arrived, body data: ');
                console.log(event.body);
            }
        })); 
    }
}