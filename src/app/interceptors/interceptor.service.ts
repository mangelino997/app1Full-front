import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ContentType = 'application/json; charset=utf-8';

    const token: String = this.authService.getToken();
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `${token}`,
          "Content-Type": ContentType,
        }
      });
    } else {
      request = req.clone({
        setHeaders: {
          "Content-Type": ContentType
        }
      });
    }

    //propago la petición clonada (en lugar de la original)
    return next.handle(request)
      .pipe(
        tap(event => {

          // si no existe un token y devuelve un httpResponse, entonces obtengo el token
          if (event instanceof HttpResponse && !token) {
            let token = event.headers.get('Authorization');
            this.authService.setAuth(token);
            this.router.navigate(['home']);
            return token;
          } else {  // si ya tengo el token entonces retorno lo que me devuelve el back
            return event;
          }
        }, error => {
          this.handleError(error);
        }));
  }

  //maneja el error de las solicitudes HTTP
  private handleError(error: HttpErrorResponse) {

    // if (error.status === 401) {
    //   // refresh token
    // } else {
    //   return throwError(error);
    // }

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 404) {
      this.router.navigate(['error404']);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);
    return throwError(errorMessage);
  }
}
