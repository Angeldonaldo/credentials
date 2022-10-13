import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {catchError,tap }from 'rxjs/operators'
import { environment } from 'src/environments/environment';

export class User{
  id:number;
  name:string;
  lastname:string;
  phone:string;
  birddate:Date;
  puesto:string;
  password:string;
  email:string;
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }
  createUser(user: User): Observable<any> {
    return this.httpClient.post<User>(environment.url_api+'/api/user/create', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error al registar usuario'))
      );
  }
  getUser(id): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.url_api+'/api/user/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get user id=${id}`))
      );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.url_api+'/api/user')
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<User[]>('Get user', []))
      );
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpClient.put(environment.url_api+'/api/updateuser/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update user'))
      );
  }
  delete(id): Observable<User[]> {
    return this.httpClient.delete<User[]>(environment.url_api+'/api/deleteuser/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete user'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
}
