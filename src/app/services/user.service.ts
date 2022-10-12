import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {catchError,tap }from 'rxjs/operators'

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

  httpOptions={
    Headers:new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }
  createUser(user: User): Observable<any> {
    return this.httpClient.post<User>('http://localhost:5000/api/user', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }
  getUser(id): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api/user/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get user id=${id}`))
      );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api')
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<User[]>('Get user', []))
      );
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/updateuser/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update user'))
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
